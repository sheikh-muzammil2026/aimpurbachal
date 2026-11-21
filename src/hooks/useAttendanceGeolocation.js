"use client";

import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { toast } from "react-toastify";
import {
  resolveMadrasaLocation,
  isWithinMadrasaGeofence,
} from "@/lib/attendance-config";

const DEFAULT_SAMPLE_WINDOW_MS = 6000;
const DEFAULT_DESIRED_ACCURACY_METERS = 20;
const DEFAULT_MAX_FIX_AGE_MS = 60000;
const GEOLOCATION_TIMEOUT_MS = 20000;

/**
 * Shared hook for live clock (1s interval) and indoor-resilient GPS / Geofence verification
 * used across Teacher and Staff self-service attendance pages.
 *
 * Uses bounded `watchPosition` sampling so cold-start coarse Wi-Fi/cell readings have time
 * to refine into a higher-accuracy GNSS fix before failing geofence checks.
 */
export function useAttendanceGeolocation({
  passAccuracyToGeofence = true,
  targetLocation = null,
  unsupportedMessage = "আপনার ব্রাউজারে Geolocation সমর্থিত নয়।",
  unsupportedToastType = "error",
  sampleWindowMs = DEFAULT_SAMPLE_WINDOW_MS,
  desiredAccuracyMeters = DEFAULT_DESIRED_ACCURACY_METERS,
  maxFixAgeMs = DEFAULT_MAX_FIX_AGE_MS,
} = {}) {
  const activeLocation = useMemo(
    () => resolveMadrasaLocation(targetLocation),
    [targetLocation]
  );

  const [currentTime, setCurrentTime] = useState(() => new Date());
  const [currentCoords, setCurrentCoords] = useState(null);
  const [locationError, setLocationError] = useState(null);
  const [isLocating, setIsLocating] = useState(false);

  const watchIdRef = useRef(null);
  const sampleTimerRef = useRef(null);
  const bestSampleRef = useRef(null);
  const activeLocationRef = useRef(activeLocation);
  const currentCoordsRef = useRef(currentCoords);

  useEffect(() => {
    activeLocationRef.current = activeLocation;
  }, [activeLocation]);

  useEffect(() => {
    currentCoordsRef.current = currentCoords;
  }, [currentCoords]);

  const clearActiveWatch = useCallback(() => {
    if (watchIdRef.current !== null && typeof navigator !== "undefined" && navigator.geolocation) {
      navigator.geolocation.clearWatch(watchIdRef.current);
      watchIdRef.current = null;
    }
    if (sampleTimerRef.current !== null) {
      clearTimeout(sampleTimerRef.current);
      sampleTimerRef.current = null;
    }
  }, []);

  // Derive geofence status reactively whenever coords or server-synced location update
  const geofenceStatus = useMemo(() => {
    if (!currentCoords) return null;
    const check = isWithinMadrasaGeofence(
      currentCoords.lat,
      currentCoords.lng,
      activeLocation.RADIUS_METERS,
      passAccuracyToGeofence ? currentCoords.accuracy : 0,
      activeLocation
    );
    return {
      ...check,
      accuracy: currentCoords.accuracy,
    };
  }, [currentCoords, activeLocation, passAccuracyToGeofence]);

  // Live Clock updating every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Clean up any active watchPosition on unmount
  useEffect(() => {
    return () => {
      clearActiveWatch();
    };
  }, [clearActiveWatch]);

  const requestLocation = useCallback(
    (onSuccess) => {
      return new Promise((resolve) => {
        if (typeof navigator === "undefined" || !navigator.geolocation) {
          setLocationError(unsupportedMessage);
          if (unsupportedToastType === "warning") {
            toast.warning(unsupportedMessage);
          } else {
            toast.error(unsupportedMessage);
          }
          resolve(null);
          return;
        }

        clearActiveWatch();
        bestSampleRef.current = null;
        setIsLocating(true);
        setLocationError(null);

        let settled = false;

        const finalize = (sample) => {
          if (settled) return;
          settled = true;
          clearActiveWatch();
          setIsLocating(false);

          if (!sample) {
            resolve(null);
            return;
          }

          setCurrentCoords(sample.coords);
          if (typeof onSuccess === "function") {
            onSuccess(sample.coords, sample.status);
          }
          resolve(sample);
        };

        // Safety timer: finalize with the best accuracy sample collected within the window
        sampleTimerRef.current = setTimeout(() => {
          if (bestSampleRef.current) {
            finalize(bestSampleRef.current);
          }
        }, sampleWindowMs);

        const handlePosition = (position) => {
          const { latitude, longitude, accuracy } = position.coords;
          const roundedAccuracy =
            Number.isFinite(accuracy) && accuracy > 0
              ? Math.round(accuracy)
              : 0;

          const coords = {
            lat: latitude,
            lng: longitude,
            accuracy: roundedAccuracy,
            timestamp: Date.now(),
          };

          const loc = activeLocationRef.current;
          const check = isWithinMadrasaGeofence(
            latitude,
            longitude,
            loc.RADIUS_METERS,
            passAccuracyToGeofence ? roundedAccuracy : 0,
            loc
          );
          const status = {
            ...check,
            accuracy: roundedAccuracy,
          };

          const prevBest = bestSampleRef.current;
          const isBetterAccuracy =
            !prevBest ||
            (roundedAccuracy > 0 &&
              (prevBest.coords.accuracy === 0 ||
                roundedAccuracy < prevBest.coords.accuracy)) ||
            (roundedAccuracy === prevBest.coords.accuracy &&
              check.distance <= prevBest.status.distance);

          if (isBetterAccuracy) {
            bestSampleRef.current = { coords, status };
            setCurrentCoords(coords);
          }

          // Stop early if we achieved a tight GNSS lock OR a valid inside-campus fix
          const hasTightLock =
            roundedAccuracy > 0 && roundedAccuracy <= desiredAccuracyMeters;
          const hasReliableInsideFix =
            status.isInside &&
            (roundedAccuracy === 0 ||
              roundedAccuracy <= (loc.ACCURACY_TOLERANCE_METERS || 50));

          if (hasTightLock || hasReliableInsideFix) {
            finalize(bestSampleRef.current);
          }
        };

        const handleError = (error) => {
          // If we already captured a usable reading before a watch timeout, keep it
          if (bestSampleRef.current) {
            finalize(bestSampleRef.current);
            return;
          }

          let msg = "লোকেশন প্রাপ্তিতে সমস্যা হয়েছে।";
          if (error.code === error.PERMISSION_DENIED) {
            msg =
              "অনুগ্রহ করে ব্রাউজার ও ডিভাইসের GPS/লোকেশন পারমিশন অন করুন।";
          } else if (error.code === error.POSITION_UNAVAILABLE) {
            msg = "ডিভাইসের অবস্থান শনাক্ত করা সম্ভব হয়নি।";
          } else if (error.code === error.TIMEOUT) {
            msg = "লোকেশন পেতে অতিরিক্ত সময় লাগছে। আবার চেষ্টা করুন।";
          }
          setLocationError(msg);
          toast.warning(msg);
          finalize(null);
        };

        watchIdRef.current = navigator.geolocation.watchPosition(
          handlePosition,
          handleError,
          {
            enableHighAccuracy: true,
            timeout: GEOLOCATION_TIMEOUT_MS,
            maximumAge: 0,
          }
        );
      });
    },
    [
      clearActiveWatch,
      desiredAccuracyMeters,
      passAccuracyToGeofence,
      sampleWindowMs,
      unsupportedMessage,
      unsupportedToastType,
    ]
  );

  /**
   * Returns current coordinates immediately if fresh & inside geofence,
   * otherwise fetches a fresh refined GPS reading before submission.
   */
  const ensureFreshLocation = useCallback(async () => {
    const existing = currentCoordsRef.current;
    const loc = activeLocationRef.current;

    if (existing && Date.now() - (existing.timestamp || 0) <= maxFixAgeMs) {
      const check = isWithinMadrasaGeofence(
        existing.lat,
        existing.lng,
        loc.RADIUS_METERS,
        passAccuracyToGeofence ? existing.accuracy : 0,
        loc
      );
      if (
        check.isInside &&
        (!existing.accuracy ||
          !loc.MAX_ALLOWED_ACCURACY_METERS ||
          existing.accuracy <= loc.MAX_ALLOWED_ACCURACY_METERS)
      ) {
        return {
          coords: existing,
          status: { ...check, accuracy: existing.accuracy },
        };
      }
    }

    return requestLocation();
  }, [maxFixAgeMs, passAccuracyToGeofence, requestLocation]);

  // Request location on component mount
  useEffect(() => {
    const timer = setTimeout(() => {
      requestLocation();
    }, 0);
    return () => clearTimeout(timer);
  }, [requestLocation]);

  return {
    currentTime,
    currentCoords,
    locationError,
    isLocating,
    geofenceStatus,
    activeLocation,
    requestLocation,
    ensureFreshLocation,
  };
}

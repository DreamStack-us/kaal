/// <reference lib="dom" />
import type React from 'react';
import { memo, useCallback, useMemo, useRef } from 'react';
import { View } from 'react-native';
import { to12Hour, to24Hour } from '../../hooks/useTimePicker';
import type { ClockMode, TimePeriod, TimeValue } from '../../types/timepicker';
import { styles } from './TimePicker.styles';

// Clock dimensions
const CLOCK_SIZE = 256;
const CLOCK_CENTER = CLOCK_SIZE / 2;
const OUTER_RADIUS = 96;
const SELECTION_DOT_RADIUS = 20;
const CENTER_DOT_RADIUS = 4;

// Hour positions (12 at top, clockwise)
const HOURS_12 = [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
const MINUTE_LABELS = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55];

/**
 * Converts clock position (0-11 for hours, 0-59 for minutes) to angle in degrees
 * 12 o'clock is at -90 degrees (top)
 */
const positionToAngle = (position: number, isMinutes = false): number => {
  if (isMinutes) {
    return position * 6 - 90; // 360/60 = 6 degrees per minute
  }
  return position * 30 - 90; // 360/12 = 30 degrees per position
};

/**
 * Gets x,y coordinates on circle from angle and radius
 */
const getPointOnCircle = (
  angleDegrees: number,
  radius: number,
): { x: number; y: number } => {
  const rad = (angleDegrees * Math.PI) / 180;
  return {
    x: CLOCK_CENTER + radius * Math.cos(rad),
    y: CLOCK_CENTER + radius * Math.sin(rad),
  };
};

interface ClockFaceProps {
  value: TimeValue;
  onChange: (time: TimeValue) => void;
  mode: ClockMode;
  onModeChange?: (mode: ClockMode) => void;
  is24Hour?: boolean;
}

export const ClockFace: React.FC<ClockFaceProps> = memo(
  ({ value, onChange, mode, onModeChange, is24Hour = false }) => {
    const svgRef = useRef<SVGSVGElement>(null);
    const isDragging = useRef(false);
    const { hour: hour12, period } = to12Hour(value.hours);

    // Calculate hand end position based on current value
    const handAngle = useMemo(() => {
      if (mode === 'hours') {
        const hourIndex = HOURS_12.indexOf(hour12);
        return positionToAngle(hourIndex >= 0 ? hourIndex : 0);
      }
      return positionToAngle(value.minutes, true);
    }, [mode, hour12, value.minutes]);

    const handEndPos = getPointOnCircle(handAngle, OUTER_RADIUS);

    const handleInteraction = useCallback(
      (clientX: number, clientY: number) => {
        if (!svgRef.current) return;

        const rect = svgRef.current.getBoundingClientRect();
        const x = clientX - rect.left;
        const y = clientY - rect.top;

        // Convert touch coordinates to angle
        const dx = x - CLOCK_CENTER;
        const dy = y - CLOCK_CENTER;
        const angle = Math.atan2(dy, dx) * (180 / Math.PI);

        // Normalize angle to 0-360, with 0 at top (12 o'clock)
        const normalized = (((angle + 90) % 360) + 360) % 360;

        if (mode === 'hours') {
          // Round to nearest hour position
          const position = Math.round(normalized / 30) % 12;
          const hour = HOURS_12[position];
          if (hour !== undefined) {
            const newHours = to24Hour(hour, period);
            onChange({ hours: newHours, minutes: value.minutes });
          }
        } else {
          // Round to nearest minute
          const minutes = Math.round(normalized / 6) % 60;
          onChange({ hours: value.hours, minutes });
        }
      },
      [mode, period, value, onChange],
    );

    const handleInteractionEnd = useCallback(() => {
      // Switch to minutes mode after selecting hours
      if (mode === 'hours' && onModeChange) {
        // Small delay for visual feedback
        setTimeout(() => onModeChange('minutes'), 200);
      }
    }, [mode, onModeChange]);

    const handleMouseDown = useCallback(
      (e: React.MouseEvent<SVGSVGElement>) => {
        isDragging.current = true;
        handleInteraction(e.clientX, e.clientY);
      },
      [handleInteraction],
    );

    const handleMouseMove = useCallback(
      (e: React.MouseEvent<SVGSVGElement>) => {
        if (!isDragging.current) return;
        handleInteraction(e.clientX, e.clientY);
      },
      [handleInteraction],
    );

    const handleMouseUp = useCallback(() => {
      if (isDragging.current) {
        isDragging.current = false;
        handleInteractionEnd();
      }
    }, [handleInteractionEnd]);

    const handleTouchStart = useCallback(
      (e: React.TouchEvent<SVGSVGElement>) => {
        isDragging.current = true;
        const touch = e.touches[0];
        if (touch) {
          handleInteraction(touch.clientX, touch.clientY);
        }
      },
      [handleInteraction],
    );

    const handleTouchMove = useCallback(
      (e: React.TouchEvent<SVGSVGElement>) => {
        if (!isDragging.current) return;
        const touch = e.touches[0];
        if (touch) {
          handleInteraction(touch.clientX, touch.clientY);
        }
      },
      [handleInteraction],
    );

    const handleTouchEnd = useCallback(() => {
      if (isDragging.current) {
        isDragging.current = false;
        handleInteractionEnd();
      }
    }, [handleInteractionEnd]);

    // Render clock numbers
    const numbers = useMemo(() => {
      if (mode === 'hours') {
        return HOURS_12.map((hour, index) => {
          const angle = positionToAngle(index);
          const pos = getPointOnCircle(angle, OUTER_RADIUS);
          const isSelected = hour12 === hour;

          return (
            <text
              key={hour}
              x={pos.x}
              y={pos.y}
              textAnchor="middle"
              dominantBaseline="central"
              fontSize={14}
              fontWeight={isSelected ? '500' : '400'}
              fill={isSelected ? '#FFFFFF' : '#E6E1E5'}
              style={{ userSelect: 'none' }}
            >
              {hour}
            </text>
          );
        });
      }

      return MINUTE_LABELS.map((minute, index) => {
        const angle = positionToAngle(index);
        const pos = getPointOnCircle(angle, OUTER_RADIUS);
        const isSelected = value.minutes === minute;

        return (
          <text
            key={minute}
            x={pos.x}
            y={pos.y}
            textAnchor="middle"
            dominantBaseline="central"
            fontSize={14}
            fontWeight={isSelected ? '500' : '400'}
            fill={isSelected ? '#FFFFFF' : '#E6E1E5'}
            style={{ userSelect: 'none' }}
          >
            {minute.toString().padStart(2, '0')}
          </text>
        );
      });
    }, [mode, hour12, value.minutes]);

    return (
      <View style={styles.clockContainer}>
        <svg
          ref={svgRef}
          width={CLOCK_SIZE}
          height={CLOCK_SIZE}
          viewBox={`0 0 ${CLOCK_SIZE} ${CLOCK_SIZE}`}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          style={{ cursor: 'pointer', touchAction: 'none' }}
        >
          {/* Background circle */}
          <circle
            cx={CLOCK_CENTER}
            cy={CLOCK_CENTER}
            r={CLOCK_SIZE / 2 - 4}
            fill="#3F384C"
          />

          {/* Selection dot (behind numbers) */}
          <circle
            cx={handEndPos.x}
            cy={handEndPos.y}
            r={SELECTION_DOT_RADIUS}
            fill="#4DA6FF"
          />

          {/* Clock hand */}
          <line
            x1={CLOCK_CENTER}
            y1={CLOCK_CENTER}
            x2={handEndPos.x}
            y2={handEndPos.y}
            stroke="#4DA6FF"
            strokeWidth={2}
          />

          {/* Center dot */}
          <circle
            cx={CLOCK_CENTER}
            cy={CLOCK_CENTER}
            r={CENTER_DOT_RADIUS}
            fill="#4DA6FF"
          />

          {/* Numbers */}
          <g>{numbers}</g>
        </svg>
      </View>
    );
  },
);

ClockFace.displayName = 'ClockFace';

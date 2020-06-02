import React from 'react';
import PropTypes from 'prop-types';

const DEBUG_STROKE = 'rgba(255, 0, 66, .5)';
const DEBUG_STROKE_WIDTH = 0.5;

//  -degree <- | -> +degree
//          _----_
//        /    |   \
//       | (origin) |
//        \    |   /
//          -____-
//
const makePoint = (origin, radius, degree) => ({
  x: origin.x + radius * Math.sin((degree * Math.PI) / 180),
  y: origin.y + radius * Math.cos((degree * Math.PI) / 180),
});

function RefugiumLogo({
  size,
  strokeWidth,
  bottomCircleRadius,
  bottomCircleVerticalOffset,
  longSideCurveInnerDegree,
  longSideCurveOuterDegree,
  className,
}) {
  const halfSize = size / 2; // => mainCircleRadius

  const shortSideCurveInnerDegree = longSideCurveInnerDegree * 2;
  const shortSideCurveOuterDegree = longSideCurveOuterDegree * 2;

  const originMainCircle = {
    x: halfSize,
    y: halfSize,
  };

  const mainCircleInnerRadius = halfSize - strokeWidth;

  const originBottomCircle = {
    x: halfSize,
    y: size + bottomCircleVerticalOffset,
  };

  const bottomCircleInnerRadius = bottomCircleRadius - strokeWidth;

  const makeSideCurve = (innerDegree, outerDegree) => ({
    start: makePoint(
      originBottomCircle,
      bottomCircleRadius - strokeWidth * 0.5,
      innerDegree,
    ),
    end: makePoint(originMainCircle, halfSize - strokeWidth * 0.5, outerDegree),
  });

  const longSideCurve = {
    left: makeSideCurve(
      -(180 - longSideCurveInnerDegree),
      -(180 - longSideCurveOuterDegree),
    ),
    right: makeSideCurve(
      180 - longSideCurveInnerDegree,
      180 - longSideCurveOuterDegree,
    ),
  };

  const shortSideCurve = {
    left: makeSideCurve(
      -(180 - shortSideCurveInnerDegree),
      -(180 - shortSideCurveOuterDegree),
    ),
    right: makeSideCurve(
      180 - shortSideCurveInnerDegree,
      180 - shortSideCurveOuterDegree,
    ),
  };

  const makeSideCurvePath = (start, end) => `
    M ${start.x},${start.y}
    C
    ${start.x},${start.y - 40}
    ${end.x},${end.y + 20}
    ${end.x}, ${end.y}
  `;

  const longSideCurvePath = {
    left: makeSideCurvePath(longSideCurve.left.start, longSideCurve.left.end),
    right: makeSideCurvePath(
      longSideCurve.right.start,
      longSideCurve.right.end,
    ),
  };

  const verticalLine = {
    start: {
      x: halfSize,
      y: strokeWidth,
    },
    end: {
      x: halfSize,
      y: size - strokeWidth,
    },
  };

  return (
    <svg
      viewBox={`0 0 ${size} ${size}`}
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      className={className}
    >
      <defs>
        <rect id="fullCanvas" x={0} y={0} width={size} height={size} />
        <circle
          id="mainInnerCircle"
          cx={originMainCircle.x}
          cy={originMainCircle.y}
          r={mainCircleInnerRadius}
        />
        <circle
          id="bottomInnerCircle"
          cx={originBottomCircle.x}
          cy={originBottomCircle.y}
          r={bottomCircleInnerRadius}
        />
      </defs>
      {/*
        -- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - --
          main circle
        -- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - --
      */}
      <mask id="mainCircleHole">
        <use xlinkHref="#fullCanvas" fill="white" />
        <use xlinkHref="#mainInnerCircle" fill="black" />
      </mask>
      <circle
        cx={originMainCircle.x}
        cy={originMainCircle.y}
        r={halfSize}
        fill="currentColor"
        mask="url(#mainCircleHole)"
      />
      {/*
        -- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - --
          bottom circle
        -- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - --
      */}
      <mask id="bottomCircleHole">
        <use xlinkHref="#mainInnerCircle" fill="white" />
        <use xlinkHref="#bottomInnerCircle" fill="black" />
      </mask>
      <circle
        cx={originBottomCircle.x}
        cy={originBottomCircle.y}
        r={bottomCircleRadius}
        fill="currentColor"
        mask="url(#bottomCircleHole)"
      />
      {/*
        -- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - --
          vertical line
        -- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - --
      */}
      <line
        x1={verticalLine.start.x}
        y1={verticalLine.start.y}
        x2={verticalLine.end.x}
        y2={verticalLine.end.y}
        stroke="currentColor"
        strokeWidth={`${strokeWidth}px`}
      />
      {/*
        -- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - --
          long side curves
        -- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - --
      */}
      <path
        d={longSideCurvePath.left}
        fill="none"
        stroke="currentColor"
        strokeWidth={`${strokeWidth}px`}
      />
      <line
        x1={longSideCurve.left.start.x}
        y1={longSideCurve.left.start.y}
        x2={longSideCurve.left.end.x}
        y2={longSideCurve.left.end.y}
        stroke={DEBUG_STROKE}
        strokeWidth={DEBUG_STROKE_WIDTH}
      />
      <path
        d={longSideCurvePath.right}
        fill="none"
        stroke="currentColor"
        strokeWidth={`${strokeWidth}px`}
      />
      <line
        x1={longSideCurve.right.start.x}
        y1={longSideCurve.right.start.y}
        x2={longSideCurve.right.end.x}
        y2={longSideCurve.right.end.y}
        stroke={DEBUG_STROKE}
        strokeWidth={DEBUG_STROKE_WIDTH}
      />
      {/*
        -- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - --
          short side curves
        -- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - --
      */}
      <line
        x1={shortSideCurve.left.start.x}
        y1={shortSideCurve.left.start.y}
        x2={shortSideCurve.left.end.x}
        y2={shortSideCurve.left.end.y}
        stroke={DEBUG_STROKE}
        strokeWidth={DEBUG_STROKE_WIDTH}
      />
      <line
        x1={shortSideCurve.right.start.x}
        y1={shortSideCurve.right.start.y}
        x2={shortSideCurve.right.end.x}
        y2={shortSideCurve.right.end.y}
        stroke={DEBUG_STROKE}
        strokeWidth={DEBUG_STROKE_WIDTH}
      />
    </svg>
  );
}

RefugiumLogo.propTypes = {
  size: PropTypes.number,
  strokeWidth: PropTypes.number,
  bottomCircleRadius: PropTypes.number,
  bottomCircleVerticalOffset: PropTypes.number,
  longSideCurveInnerDegree: PropTypes.number,
  longSideCurveOuterDegree: PropTypes.number,
};

RefugiumLogo.defaultProps = {
  size: 100,
  strokeWidth: 2,
  bottomCircleRadius: 40,
  bottomCircleVerticalOffset: 10,
  longSideCurveInnerDegree: 16,
  longSideCurveOuterDegree: 45,
};

export default React.memo(RefugiumLogo);

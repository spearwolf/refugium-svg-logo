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
  color,
  size,
  strokeWidth,
  outerStrokeWidth,
  bottomCircleRadius,
  bottomCircleVerticalOffset,
  longSideCurveInnerDegree,
  longSideCurveOuterDegree,
  shortSideCurveInnerDegree,
  shortSideCurveOuterDegree,
  showGuideLines,
  className,
}) {
  const halfSize = size / 2; // => mainCircleRadius

  const originMainCircle = {
    x: halfSize,
    y: halfSize,
  };

  const mainCircleInnerRadius = halfSize - outerStrokeWidth;

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

  const longSideCurveCubicOffset = {
    start: {
      x: 0,
      y: -29,
    },
    end: {
      x: 4,
      y: 35,
    },
  };

  const shortSideCurveCubicOffset = {
    start: {
      x: -5,
      y: -18,
    },
    end: {
      x: 10,
      y: 15,
    },
  };

  const makeSideCurvePath = (start, end, startOffset, endOffset) => `
    M ${start.x},${start.y}
    C
    ${start.x + startOffset.x},${start.y + startOffset.y}
    ${end.x + endOffset.x},${end.y + endOffset.y}
    ${end.x}, ${end.y}
  `;

  const longSideCurvePath = {
    left: makeSideCurvePath(
      longSideCurve.left.start,
      longSideCurve.left.end,
      longSideCurveCubicOffset.start,
      longSideCurveCubicOffset.end,
    ),
    right: makeSideCurvePath(
      longSideCurve.right.start,
      longSideCurve.right.end,
      {
        x: -longSideCurveCubicOffset.start.x,
        y: longSideCurveCubicOffset.start.y,
      },
      {
        x: -longSideCurveCubicOffset.end.x,
        y: longSideCurveCubicOffset.end.y,
      },
    ),
  };

  const shortSideCurvePath = {
    left: makeSideCurvePath(
      shortSideCurve.left.start,
      shortSideCurve.left.end,
      shortSideCurveCubicOffset.start,
      shortSideCurveCubicOffset.end,
    ),
    right: makeSideCurvePath(
      shortSideCurve.right.start,
      shortSideCurve.right.end,
      {
        x: -shortSideCurveCubicOffset.start.x,
        y: shortSideCurveCubicOffset.start.y,
      },
      {
        x: -shortSideCurveCubicOffset.end.x,
        y: shortSideCurveCubicOffset.end.y,
      },
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
        fill={color}
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
        fill={color}
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
        stroke={color}
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
        stroke={color}
        strokeWidth={`${strokeWidth}px`}
      />
      <path
        d={longSideCurvePath.right}
        fill="none"
        stroke={color}
        strokeWidth={`${strokeWidth}px`}
      />
      {showGuideLines ? (
        <>
          <line
            x1={longSideCurve.left.start.x}
            y1={longSideCurve.left.start.y}
            x2={longSideCurve.left.end.x}
            y2={longSideCurve.left.end.y}
            stroke={DEBUG_STROKE}
            strokeWidth={DEBUG_STROKE_WIDTH}
          />
          <line
            x1={longSideCurve.right.start.x}
            y1={longSideCurve.right.start.y}
            x2={longSideCurve.right.end.x}
            y2={longSideCurve.right.end.y}
            stroke={DEBUG_STROKE}
            strokeWidth={DEBUG_STROKE_WIDTH}
          />
        </>
      ) : null}
      {/*
        -- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - --
          short side curves
        -- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - --
      */}
      <path
        d={shortSideCurvePath.left}
        fill="none"
        stroke={color}
        strokeWidth={`${strokeWidth}px`}
      />
      <path
        d={shortSideCurvePath.right}
        fill="none"
        stroke={color}
        strokeWidth={`${strokeWidth}px`}
      />
      {showGuideLines ? (
        <>
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
        </>
      ) : null}
    </svg>
  );
}

RefugiumLogo.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  strokeWidth: PropTypes.number,
  bottomCircleRadius: PropTypes.number,
  bottomCircleVerticalOffset: PropTypes.number,
  longSideCurveInnerDegree: PropTypes.number,
  longSideCurveOuterDegree: PropTypes.number,
  showGuideLines: PropTypes.bool,
};

RefugiumLogo.defaultProps = {
  color: 'currentColor',
  size: 100,
  strokeWidth: 1.5,
  outerStrokeWidth: 3,
  bottomCircleRadius: 39,
  bottomCircleVerticalOffset: 9,
  longSideCurveInnerDegree: 15.5,
  longSideCurveOuterDegree: 43,
  shortSideCurveInnerDegree: 38,
  shortSideCurveOuterDegree: 91,
  showGuideLines: true,
};

export default React.memo(RefugiumLogo);

import React from "react";
import PropTypes from "prop-types";

//  -radius <- | -> +radius
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

export function RefugiumLogo({ className, strokeWidth }) {
  const size = 100;

  const bottomCircleRadius = 32;

  const longSideCurveInnerDegree = 21;
  const longSideCurveOuterDegree = 45;

  const halfSize = size / 2;

  const shortSideCurveInnerDegree = longSideCurveInnerDegree * 2;
  const shortSideCurveOuterDegree = longSideCurveOuterDegree * 2;

  const originMainCircle = {
    x: halfSize,
    y: halfSize,
  };

  const originBottomCircle = {
    x: halfSize,
    y: size,
  };

  const makeSideCurve = (innerDegree, outerDegree) => ({
    start: makePoint(
      originBottomCircle,
      bottomCircleRadius - strokeWidth * 0.5,
      innerDegree
    ),
    end: makePoint(originMainCircle, halfSize - strokeWidth * 0.5, outerDegree),
  });

  const longSideCurve = {
    left: makeSideCurve(
      -(180 - longSideCurveInnerDegree),
      -(180 - longSideCurveOuterDegree)
    ),
    right: makeSideCurve(
      180 - longSideCurveInnerDegree,
      180 - longSideCurveOuterDegree
    ),
  };

  const shortSideCurve = {
    left: makeSideCurve(
      -(180 - shortSideCurveInnerDegree),
      -(180 - shortSideCurveOuterDegree)
    ),
    right: makeSideCurve(
      180 - shortSideCurveInnerDegree,
      180 - shortSideCurveOuterDegree
    ),
  };

  const makeSideCurvePath = (start, end) => `
    M ${start.x},${start.y}
    C
    ${start.x},${start.y - 30}
    ${end.x},${end.y + 20}
    ${end.x}, ${end.y}
  `;

  const longSideCurvePath = {
    left: makeSideCurvePath(longSideCurve.left.start, longSideCurve.left.end),
    right: makeSideCurvePath(
      longSideCurve.right.start,
      longSideCurve.right.end
    ),
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
          cx={halfSize}
          cy={halfSize}
          r={halfSize - strokeWidth}
        />
        <circle
          id="bottomInnerCircle"
          cx={halfSize}
          cy={size}
          r={bottomCircleRadius - strokeWidth}
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
        cx={halfSize}
        cy={halfSize}
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
        cx={halfSize}
        cy={size}
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
        x1={halfSize}
        y1={strokeWidth}
        x2={halfSize}
        y2={size - strokeWidth}
        stroke="currentColor"
        strokeWidth={`${strokeWidth}px`}
      />
      {/*
        -- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - --
          long side curves
        -- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - --
      */}
      <line
        x1={longSideCurve.left.start.x}
        y1={longSideCurve.left.start.y}
        x2={longSideCurve.left.end.x}
        y2={longSideCurve.left.end.y}
        stroke="#8ac"
        strokeWidth={0.5}
      />
      <path
        d={longSideCurvePath.left}
        fill="none"
        stroke="currentColor"
        strokeWidth={`${strokeWidth}px`}
      />
      <line
        x1={longSideCurve.right.start.x}
        y1={longSideCurve.right.start.y}
        x2={longSideCurve.right.end.x}
        y2={longSideCurve.right.end.y}
        stroke="#8ac"
        strokeWidth={0.5}
      />
      <path
        d={longSideCurvePath.right}
        fill="none"
        stroke="currentColor"
        strokeWidth={`${strokeWidth}px`}
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
        stroke="#8ac"
        strokeWidth={0.5}
      />
      <line
        x1={shortSideCurve.right.start.x}
        y1={shortSideCurve.right.start.y}
        x2={shortSideCurve.right.end.x}
        y2={shortSideCurve.right.end.y}
        stroke="#8ac"
        strokeWidth={0.5}
      />
    </svg>
  );
}

RefugiumLogo.propTypes = {
  strokeWidth: PropTypes.number,
};

RefugiumLogo.defaultProps = {
  strokeWidth: 2,
};

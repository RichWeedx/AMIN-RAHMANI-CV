import React, { useId } from "react";
import tabletFrameImage from "../assets/images/tablet.png";
import "./tablet_project_preview.css";

const DEFAULT_SCREEN_RECT = {
  top: "19.6%",
  left: "23.45%",
  width: "53.55%",
  height: "60.35%",
};

const TabletProjectPreview = ({
  image,
  projectUrl,
  alt,
  screenRect,
  objectPosition = "center top",
  imageScale = 1.45,
  onActivate,
  ariaLabel,
}) => {
  const clipId = useId().replace(/:/g, "");
  const mergedRect = { ...DEFAULT_SCREEN_RECT, ...(screenRect || {}) };

  const style = {
    "--tablet-screen-top": mergedRect.top,
    "--tablet-screen-left": mergedRect.left,
    "--tablet-screen-width": mergedRect.width,
    "--tablet-screen-height": mergedRect.height,
    "--tablet-screen-object-position": objectPosition,
  };

  const cutoutTop = parseFloat(mergedRect.top);
  const cutoutLeft = parseFloat(mergedRect.left);
  const cutoutWidth = parseFloat(mergedRect.width);
  const cutoutHeight = parseFloat(mergedRect.height);

  const viewBoxWidth = 1500;
  const viewBoxHeight = 1001;
  const x = (cutoutLeft / 100) * viewBoxWidth;
  const y = (cutoutTop / 100) * viewBoxHeight;
  const width = (cutoutWidth / 100) * viewBoxWidth;
  const height = (cutoutHeight / 100) * viewBoxHeight;

  const scaledWidth = width * imageScale;
  const scaledHeight = height * imageScale;
  const scaledX = x - (scaledWidth - width) / 2;
  const scaledY = y - (scaledHeight - height) / 2;

  const content = (
    <span className="tablet-project-visual" style={style}>
      <svg
        className="tablet-project-overlay"
        aria-hidden="true"
        viewBox="0 0 1500 1001"
        preserveAspectRatio="xMidYMid meet"
      >
        <image
          href={image}
          x={scaledX}
          y={scaledY}
          width={scaledWidth}
          height={scaledHeight}
          preserveAspectRatio="xMidYMid slice"
        />
        <defs>
          <mask id={`tablet-frame-mask-${clipId}`} maskUnits="userSpaceOnUse">
            <rect x="0" y="0" width="1500" height="1001" fill="white" />
            <rect x={x} y={y} width={width} height={height} fill="black" />
          </mask>
        </defs>
        <image
          href={tabletFrameImage}
          width="1500"
          height="1001"
          preserveAspectRatio="xMidYMid meet"
          mask={`url(#tablet-frame-mask-${clipId})`}
        />
      </svg>
    </span>
  );

  if (projectUrl) {
    return (
      <a
        className="tablet-project-preview"
        href={projectUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={ariaLabel || alt}
      >
        {content}
      </a>
    );
  }

  return (
    <div
      className="tablet-project-preview"
      role="link"
      tabIndex={0}
      onClick={onActivate}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onActivate?.();
        }
      }}
      aria-label={ariaLabel || alt}
    >
      {content}
    </div>
  );
};

export default TabletProjectPreview;

import React, { useEffect, useRef, useState } from "react";

const SketchfabModel = ({
  modelId = "1eecbfe0ae134b4886e3fff4198eb6c3",
  ratio = 1,
  width = "100%",
  maxWidth,
  showCredits = false,
  autostart = 1,
  preload = 1,
  autospin = 1,
  transparent = 1,
  iframeProps = {},
}) => {
  const wrapperRef = useRef(null);
  const iframeRef = useRef(null);
  const [apiScriptLoaded, setApiScriptLoaded] = useState(false);
  const [initialized, setInitialized] = useState(false);

  const embedParams = [
    `autostart=${autostart}`,
    `preload=${preload}`,
    `autospin=${autospin}`,
    `transparent=${transparent}`,
    `ui_controls=0`,
    `ui_infos=0`,
    `ui_annotations=0`,
    `ui_help=0`,
    `ui_stop=0`,
    `ui_vr=0`,
    `ui_share=0`,
    `ui_hint=0`,
    `ui_settings=0`,
    `ui_inspector=0`,
    `ui_watermark=0`,
    `ui_watermark_link=0`,
  ].join("&");

  const embedSrc = `https://sketchfab.com/models/${modelId}/embed?${embedParams}&cb=${Date.now()}`;

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.Sketchfab) {
      setApiScriptLoaded(true);
      return;
    }
    const ID = "sketchfab-viewer-api-script";
    if (document.getElementById(ID)) {
      const intv = setInterval(() => {
        if (window.Sketchfab) {
          setApiScriptLoaded(true);
          clearInterval(intv);
        }
      }, 100);
      return () => clearInterval(intv);
    }
    const script = document.createElement("script");
    script.id = ID;
    script.src = "https://static.sketchfab.com/api/sketchfab-viewer-1.12.1.js";
    script.async = true;
    script.onload = () => setApiScriptLoaded(true);
    script.onerror = () => setApiScriptLoaded(false);
    document.body.appendChild(script);
  }, []);

  useEffect(() => {
    if (!apiScriptLoaded || !iframeRef.current || initialized) return;
    try {
      const Sketchfab = window.Sketchfab;
      if (!Sketchfab) return;
      const client = new Sketchfab(iframeRef.current);
      client.init(modelId, {
        autostart,
        autospin,
        preload,
        transparent,
        ui_controls: 0,
        ui_settings: 0,
        success: function (api) {
          api.addEventListener("viewerready", function () {
            try {
              api.start(() => {});
              if (typeof api.setBackground === "function") {
                api.setBackground({ transparent: true }, function () {});
              }
            } catch (err) {}
          });
        },
        error: function () {},
      });
      setInitialized(true);
    } catch (e) {
      setInitialized(true);
    }
  }, [apiScriptLoaded, iframeRef, modelId, initialized]);

  const containerStyle = {
    width,
    maxWidth: maxWidth || "none",
    position: "relative",
    overflow: "hidden",
    background: "transparent",
  };

  const spacerStyle = {
    width: "100%",
    paddingTop: `${100 / Math.max(ratio, 0.0001)}%`,
    fontSize: 0,
  };

  const iframeStyle = {
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
    border: 0,
    background: "transparent",
  };

  return (
    <div ref={wrapperRef} style={containerStyle} aria-hidden={false}>
      <div style={spacerStyle} />
      <div style={{ position: "absolute", inset: 0 }}>
        <iframe
          ref={iframeRef}
          title={`Sketchfab model ${modelId}`}
          src={embedSrc}
          frameBorder="0"
          allow="autoplay; vr; xr-spatial-tracking"
          style={iframeStyle}
          {...iframeProps}
        />
      </div>
      {showCredits && (
        <p style={{ fontSize: 12, marginTop: 6, color: "#4A4A4A" }}>
          <a
            href={`https://sketchfab.com/models/${modelId}`}
            target="_blank"
            rel="nofollow noopener noreferrer"
            style={{ fontWeight: 600, color: "#1CAAD9", textDecoration: "none" }}
          >
            View on Sketchfab
          </a>
        </p>
      )}
    </div>
  );
};

export default SketchfabModel;

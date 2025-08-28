import React, { useEffect, useRef, useState } from "react";

const SketchfabModel = ({
  modelId = "1eecbfe0ae134b4886e3fff4198eb6c3",
  ratio = 1,
  width = "100%",
  maxWidth,
  showCredits = false,
  autoLoad = true,
  iframeProps = {},
}) => {
  const wrapperRef = useRef(null);
  const iframeRef = useRef(null);
  const [apiScriptLoaded, setApiScriptLoaded] = useState(false);
  const [initialized, setInitialized] = useState(false);

  const embedParams = [
    "autostart=1",
    "preload=1",
    "autospin=0",
    "ui_controls=0",
    "ui_infos=0",
    "ui_annotations=0",
    "ui_help=0",
    "ui_stop=0",
    "ui_vr=0",
    "ui_share=0",
    "ui_hint=0",
    "ui_settings=0",
    "ui_inspector=0",
    "ui_watermark=0",
    "ui_watermark_link=0",
    "transparent=1",
  ].join("&");

  const embedSrc = `https://sketchfab.com/models/${modelId}/embed?${embedParams}`;

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
    script.onerror = () => {
      console.warn("Sketchfab Viewer API script failed to load — iframe fallback will still render.");
      setApiScriptLoaded(false);
    };
    document.body.appendChild(script);

  }, []);

  useEffect(() => {
    if (!apiScriptLoaded) return;
    if (!iframeRef.current) return;
    if (initialized) return;

    try {
      const Sketchfab = window.Sketchfab;
      if (!Sketchfab) {
        console.warn("Sketchfab API not available even though script loaded.");
        return;
      }

      const client = new Sketchfab(iframeRef.current);

      client.init(modelId, {
        autostart: 1,
        autospin: 0,
        preload: 1,
        transparent: 1,
        ui_controls: 0,
        ui_infos: 0,
        ui_annotations: 0,
        ui_help: 0,
        ui_stop: 0,
        ui_vr: 0,
        ui_share: 0,
        ui_hint: 0,
        ui_settings: 0,
        ui_inspector: 0,
        ui_watermark: 0,
        ui_watermark_link: 0,
        success: function (api) {
          try {
            api.addEventListener("viewerready", function () {
              try {
                api.start(() => {
                });
              } catch (err) {
                console.warn("api.start() error (may be account-limited):", err);
              }
            });

            try {
              if (typeof api.setBackground === "function") {
                api.setBackground({ transparent: true }, function () {});
              }
            } catch (err) {
            }
          } catch (e) {
            console.warn("Sketchfab init viewerready/start error:", e);
          }
        },
        error: function () {
          console.warn("Sketchfab client init error — iframe will still render.");
        },
      });

      setInitialized(true);
    } catch (e) {
      console.warn("Sketchfab Viewer API initialization error:", e);
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
          allow="autoplay; fullscreen; vr; xr-spatial-tracking"
          allowFullScreen
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
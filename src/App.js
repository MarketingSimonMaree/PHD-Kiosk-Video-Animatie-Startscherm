import React, { useState, useEffect, useRef } from "react";

const App = () => {
  const [position, setPosition] = useState({ x: 50, y: 50 });
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [loopCount, setLoopCount] = useState(0);
  const videoRef = useRef(null);
  const lastTimeRef = useRef(0);

  // Video loop patroon configuratie
  const audioLoops = 0;    // Aantal loops met geluid aan
  const muteLoops = 3;     // Aantal loops met geluid uit
  const totalPattern = audioLoops + muteLoops;

  // Start video
  const startVideo = async () => {
    if (videoRef.current) {
      try {
        videoRef.current.muted = !audioEnabled;
        videoRef.current.volume = 0;
        await videoRef.current.play();
      } catch (err) {
        console.error("Video start failed:", err);
      }
    }
  };

  // Check voor video loop
  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const currentTime = videoRef.current.currentTime;
      if (currentTime < lastTimeRef.current) {
        // Video is geloopt
        const newLoopCount = (loopCount + 1) % totalPattern;
        setLoopCount(newLoopCount);
        
        // Bepaal of audio aan of uit moet
        const shouldEnableAudio = newLoopCount < audioLoops;
        setAudioEnabled(shouldEnableAudio);
      }
      lastTimeRef.current = currentTime;
    }
  };

  useEffect(() => {
    startVideo();

    const positionInterval = setInterval(() => {
      setPosition({
        x: Math.random() * 70 + 15,
        y: Math.random() * 70 + 15,
      });
    }, 2000);

    return () => {
      clearInterval(positionInterval);
    };
  }, []);

  // Update video muted status wanneer audioEnabled verandert
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = !audioEnabled;
    }
  }, [audioEnabled]);

  // Verbeterde click handler om blauwe highlight te voorkomen
  const handleClick = (e) => {
    // Voorkom standaard browser gedrag dat highlighting kan veroorzaken
    if (e && e.preventDefault) {
      e.preventDefault();
    }
    
    // Verwijder focus van het element
    if (document.activeElement) {
      document.activeElement.blur();
    }

    // Originele navigatie logica
    if (window.kiosk) {
      window.kiosk.full("https://phd-kiosk-scherm-2-quiz.vercel.app/");
    } else {
      window.location.href = "https://phd-kiosk-scherm-2-quiz.vercel.app/";
    }
  };

  // Touch handlers voor mobiele apparaten
  const handleTouchStart = (e) => {
    // Voorkom standaard touch gedrag dat highlighting kan veroorzaken
    e.preventDefault();
  };

  const handleTouchEnd = (e) => {
    // Voorkom standaard touch gedrag
    e.preventDefault();
    
    // Navigeer naar de bestemming
    handleClick(e);
  };

  return (
    <>
      {/* Onzichtbare overlay button om klikken op te vangen zonder highlight */}
      <button
        onClick={handleClick}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 1000,
          opacity: 0,
          background: "none",
          border: "none",
          cursor: "pointer",
          WebkitTapHighlightColor: "transparent",
          WebkitTouchCallout: "none",
          WebkitUserSelect: "none",
          userSelect: "none",
          touchAction: "none",
          outline: "none"
        }}
        aria-label="Navigeer naar quiz"
      />

      {/* De rest van de UI zonder onClick om dubbele handlers te voorkomen */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          overflow: "hidden",
          backgroundColor: "black",
          touchAction: "none",
        }}
      >
        <video
          ref={videoRef}
          playsInline
          loop
          preload="auto"
          onTimeUpdate={handleTimeUpdate}
          poster="https://cdn.shopify.com/s/files/1/0524/8794/6424/files/Scherm-Video-Anymatie-Compress-Thumb-2.jpg?v=1741350164"
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            objectFit: "cover"
          }}
        >
          <source
            src="https://cdn.shopify.com/videos/c/o/v/ab592dbfafb2471eb0dbd31e6f99ca5f.mp4"
            type="video/mp4"
          />
        </video>

        <div style={{ position: "absolute", inset: 0, backgroundColor: "rgba(0, 0, 0, 0.3)" }}>
          <div
            style={{
              position: "absolute",
              left: `${position.x}%`,
              top: `${position.y}%`,
              transform: "translate(-50%, -50%)",
              transition: "all 0.5s ease-in-out",
            }}
          >
            <div style={{ position: "relative" }}>
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  borderRadius: "50%",
                  backgroundColor: "rgba(255, 255, 255, 0.2)",
                  width: "105px",
                  height: "105px",
                  animation: "ping 1s cubic-bezier(0, 0, 0.2, 1) infinite",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  borderRadius: "50%",
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                  width: "105px",
                  height: "105px",
                  animation: "ping 1s cubic-bezier(0, 0, 0.2, 1) infinite",
                  animationDelay: "0.15s",
                }}
              />
              <div
                style={{
                  position: "relative",
                  borderRadius: "50%",
                  backgroundColor: "rgba(255, 255, 255, 0.3)",
                  width: "105px",
                  height: "105px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <div
                  style={{
                    width: "52px",
                    height: "52px",
                    borderRadius: "50%",
                    backgroundColor: "white",
                    animation: "bounce 1s infinite",
                  }}
                />
              </div>
            </div>

            <div
              style={{
                textAlign: "center",
                marginTop: "16px",
                whiteSpace: "nowrap",
              }}
            >
              <p
                style={{
                  color: "white",
                  fontSize: "26px",
                  fontWeight: "bold",
                  animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
                }}
              >
                Tik hier!
              </p>
            </div>
          </div>
        </div>

        <style>
          {`
            body {
              margin: 0;
              padding: 0;
              overflow: hidden;
              position: fixed;
              width: 100%;
              height: 100%;
            }

            /* Uitgebreide regels voor het verwijderen van tap highlights */
            * {
              -webkit-tap-highlight-color: rgba(0, 0, 0, 0) !important;
              -webkit-tap-highlight-color: transparent !important;
              -webkit-touch-callout: none !important;
              -webkit-user-select: none !important;
              user-select: none !important;
              outline: none !important;
            }

            a, button, input, textarea, [role="button"], [tabindex]:not([tabindex="-1"]) {
              -webkit-tap-highlight-color: rgba(0, 0, 0, 0) !important;
              -webkit-tap-highlight-color: transparent !important;
              outline: none !important;
            }

            html, body {
              -webkit-tap-highlight-color: rgba(0, 0, 0, 0) !important;
              -webkit-tap-highlight-color: transparent !important;
            }

            ::-moz-focus-inner {
              border: 0 !important;
            }

            @keyframes ping {
              75%, 100% {
                transform: scale(2);
                opacity: 0;
              }
            }
            @keyframes bounce {
              0%, 100% {
                transform: translateY(-25%);
                animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
              }
              50% {
                transform: translateY(0);
                animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
              }
            }
            @keyframes pulse {
              50% {
                opacity: .5;
              }
            }

            video::-webkit-media-controls {
              display: none !important;
            }
            
            video::-webkit-media-controls-enclosure {
              display: none !important;
            }
          `}
        </style>
      </div>
    </>
  );
};

export default App;

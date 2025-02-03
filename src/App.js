import React, { useState, useEffect, useRef } from "react";

const App = () => {
  const [position, setPosition] = useState({ x: 50, y: 50 });
  const [videoLoaded, setVideoLoaded] = useState(false);
  const videoRef = useRef(null);

  const startVideo = async () => {
    if (videoRef.current) {
      try {
        document.documentElement.dispatchEvent(new MouseEvent("click"));
        videoRef.current.muted = false;
        videoRef.current.volume = 1;
        await videoRef.current.play();

        setTimeout(() => {
          if (videoRef.current && videoRef.current.paused) {
            videoRef.current.play();
          }
        }, 100);
      } catch (err) {
        console.error("Video start failed:", err);
      }
    }
  };

  useEffect(() => {
    startVideo();

    const videoCheck = setInterval(() => {
      if (videoRef.current && videoRef.current.paused) {
        startVideo();
      }
    }, 1000);

    const positionInterval = setInterval(() => {
      setPosition({
        x: Math.random() * 70 + 15,
        y: Math.random() * 70 + 15,
      });
    }, 2000);

    return () => {
      clearInterval(positionInterval);
      clearInterval(videoCheck);
    };
  }, []);

  const handleClick = () => {
    if (window.kiosk) {
      window.kiosk.full("https://phd-kiosk-scherm-2-quiz.vercel.app/");
    } else {
      window.location.href = "https://phd-kiosk-scherm-2-quiz.vercel.app/";
    }
  };

  return (
    <div
      onClick={handleClick}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        overflow: "hidden",
        backgroundColor: "black",
        cursor: "pointer",
        touchAction: "none",
      }}
    >
      {/* Preload image */}
      <img
        src="https://cdn.shopify.com/s/files/1/0524/8794/6424/files/Start_Scherm_Intro_3.jpg?v=1738083124"
        alt="Video thumbnail"
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          objectFit: "cover",
          opacity: videoLoaded ? 0 : 1,
          transition: "opacity 0.5s ease"
        }}
      />

      <video
        ref={videoRef}
        playsInline
        loop
        preload="auto"
        onLoadedData={() => setVideoLoaded(true)}
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          objectFit: "cover",
          opacity: videoLoaded ? 1 : 0,
          transition: "opacity 0.5s ease"
        }}
      >
        <source
          src="https://cdn.shopify.com/videos/c/o/v/6fd04b7387ce41fda0175f4c2ded0a33.mp4"
          type="video/mp4"
        />
      </video>

      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: "rgba(0, 0, 0, 0.3)",
        }}
      >
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
  );
};

export default App;

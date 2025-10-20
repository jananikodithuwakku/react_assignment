import { useState, useRef, useLayoutEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Assignment_31() {
  const [activeItem, setActiveItem] = useState(null); // stores clicked image
  const [rect, setRect] = useState(null); // stores image position & size before zoom
  const containerRef = useRef(null); // container reference for layout calculations

  //  each item has a low & high resolution image 
  const items = [
    {
      id: 1,
      title: "Mountain ",
      imgLow: "https://i.pinimg.com/400x/2c/a8/0a/2ca80a80bbe1c1d63a4a9cc7abca6313.jpg",
      imgHigh: "https://i.pinimg.com/1200x/2c/a8/0a/2ca80a80bbe1c1d63a4a9cc7abca6313.jpg",
    },
    {
      id: 2,
      title: "Forest",
      imgLow: "https://i.pinimg.com/400x/38/eb/b5/38ebb59f61bef27e20ce1b139eff417b.jpg",
      imgHigh: "https://i.pinimg.com/1200x/38/eb/b5/38ebb59f61bef27e20ce1b139eff417b.jpg",
    },
    {
      id: 3,
      title: "Beach",
      imgLow: "https://i.pinimg.com/400x/07/45/a4/0745a4cbe78ddda25a5d5a91e6425e06.jpg",
      imgHigh: "https://i.pinimg.com/1200x/07/45/a4/0745a4cbe78ddda25a5d5a91e6425e06.jpg",
    },
    {
      id: 4,
      title: "City",
      imgLow: "https://i.pinimg.com/400x/cd/9a/db/cd9adb5b8bf309aaf72b40386cea4172.jpg",
      imgHigh: "https://i.pinimg.com/1200x/cd/9a/db/cd9adb5b8bf309aaf72b40386cea4172.jpg",
    },
    {
      id: 5,
      title: "Desert",
      imgLow: "https://i.pinimg.com/400x/1d/e3/ad/1de3ad630c0abefad444184d9ed6d71f.jpg",
      imgHigh: "https://i.pinimg.com/1200x/1d/e3/ad/1de3ad630c0abefad444184d9ed6d71f.jpg",
    },
    {
      id: 6,
      title: "Lake View",
      imgLow: "https://i.pinimg.com/400x/ef/3c/81/ef3c8175242b7cb1368be14fe7d619a1.jpg",
      imgHigh: "https://i.pinimg.com/1200x/ef/3c/81/ef3c8175242b7cb1368be14fe7d619a1.jpg",
    },
    {
      id: 7,
      title: "Snowy Cabin",
      imgLow: "https://i.pinimg.com/400x/3d/f7/1c/3df71cbd9617dc54a91702324fbdebdd.jpg",
      imgHigh: "https://i.pinimg.com/1200x/3d/f7/1c/3df71cbd9617dc54a91702324fbdebdd.jpg",
    },
    {
      id: 8,
      title: "Pink Sky",
      imgLow: "https://i.pinimg.com/400x/9d/ae/a4/9daea4b59a23502f0837aa52dacb8eac.jpg",
      imgHigh: "https://i.pinimg.com/1200x/9d/ae/a4/9daea4b59a23502f0837aa52dacb8eac.jpg",
    },
    {
      id: 9,
      title: "Sunset Mountains",
      imgLow: "https://i.pinimg.com/400x/19/9d/d0/199dd0aae7ea500a3819ba8430d873b8.jpg",
      imgHigh: "https://i.pinimg.com/1200x/19/9d/d0/199dd0aae7ea500a3819ba8430d873b8.jpg",
    },
  ];

  //  open image and store its position (for smooth zoom transition) 
  const handleOpen = (item, e) => {
    const bounds = e.currentTarget.getBoundingClientRect();
    setRect(bounds);
    setActiveItem(item);
  };

  //  close the zoomed image 
  const handleClose = () => setActiveItem(null);

  useLayoutEffect(() => {
    document.body.style.overflow = activeItem ? "hidden" : "auto";
  }, [activeItem]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        padding: "50px 0",
        background: "linear-gradient(135deg, #f5f7fa 0%, #e4e8ec 100%)",
        minHeight: "100vh",
      }}
    >
      <div
        ref={containerRef}
        style={{
          background: "#fff",
          padding: "40px",
          borderRadius: "20px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
          width: "90%",
          maxWidth: "1200px",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            marginBottom: "30px",
            color: "#222",
            fontSize: "28px",
          }}
        >
          Zoom In Gallery
        </h1>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
            gap: "20px",
          }}
        >
          {items.map((item) => (
            <div
              key={item.id}
              onClick={(e) => handleOpen(item, e)}
              style={{
                borderRadius: "16px",
                overflow: "hidden",
                boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
                cursor: "pointer",
                transition: "transform 0.2s ease",
              }}
            >
              <img
                src={item.imgLow}
                alt={item.title}
                style={{
                  width: "100%",
                  height: "200px",
                  objectFit: "cover",
                  display: "block",
                }}
              />
              <h3
                style={{
                  textAlign: "center",
                  margin: "10px 0",
                  color: "#333",
                }}
              >
                {item.title}
              </h3>
            </div>
          ))}
        </div>

        <AnimatePresence>
          {activeItem && rect && (
            <motion.div
              initial={{
                position: "fixed",
                top: rect.top,
                left: rect.left,
                width: rect.width,
                height: rect.height,
              }}
              animate={{
                top: "50%",
                left: "50%",
                width: "80vw",
                height: "80vh",
                x: "-50%",
                y: "-50%",
                transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] },
              }}
              exit={{
                top: rect.top,
                left: rect.left,
                width: rect.width,
                height: rect.height,
                x: 0,
                y: 0,
                transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] },
              }}
              style={{
                position: "fixed",
                zIndex: 1000,
                background: "#fff",
                borderRadius: "16px",
                overflow: "hidden",
                boxShadow: "0 10px 40px rgba(0,0,0,0.4)",
              }}
            >
              <motion.img
                src={activeItem.imgHigh}
                alt={activeItem.title}
                style={{
                  width: "100%",
                  height: "70%",
                  objectFit: "cover",
                  imageRendering: "auto",
                }}
              />

              <motion.div
                style={{
                  padding: "20px",
                  textAlign: "center",
                }}
              >
                <h2>{activeItem.title}</h2>

                <button
                  onClick={handleClose}
                  style={{
                    marginTop: "15px",
                    padding: "10px 20px",
                    background: "#222",
                    color: "#fff",
                    border: "none",
                    borderRadius: "8px",
                    cursor: "pointer",
                  }}
                >
                  Close
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

import { useRef, useState } from "react"
import "./Assignment_21_i.css"

export default function Assignment_21() {
  // canvas reference
  const canvasRef = useRef(null)
  // picked color
  const [color, setColor] = useState("")
  // image URL for preview
  const [imageURL, setImageURL] = useState("")

  // upload function
  const handleUpload = () => {
    // create hidden file input
    const input = document.createElement("input")
    input.type = "file"
    input.accept = "image/*"
    input.multiple = false

    // listen when user selects a file
    input.addEventListener("change", () => {
      const file = input.files[0]
      if (!file) return

      // create image
      const image = new Image()
      // draw image on canvas when loaded
      image.addEventListener("load", () => {
        if (!canvasRef.current) return
        const canvas = canvasRef.current
        const ctx = canvas.getContext("2d")
        // set canvas size to image size
        canvas.width = image.width
        canvas.height = image.height
        ctx.drawImage(image, 0, 0)
      })
      // set object URL
      const url = URL.createObjectURL(file)
      setImageURL(url)
      image.src = url
    })

    // open file chooser
    input.click()
  }

  // pick color function
  const handleColorPick = (e) => {
    if (!canvasRef.current) return
    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")

    // get x,y from click
    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    // get pixel data
    const pixel = ctx.getImageData(x, y, 1, 1).data
    const [r, g, b, a] = pixel
    // rgb string
    const rgb = `rgb(${r}, ${g}, ${b})`
    // hex string
    const hex = `#${[r, g, b].map(val => val.toString(16).padStart(2, "0")).join("")}`

    // store color
    setColor(`${rgb} / ${hex}`)
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>Color Picker</h2>

      {/* upload button */}
      <button onClick={handleUpload}>
        Select Image
      </button>

      <br /><br />

      {/* canvas */}
      <canvas
        ref={canvasRef}
        onClick={handleColorPick}
        style={{ border: "1px solid #333", cursor: "crosshair" }}
      />

      <br /><br />

      {/* color result */}
      {color && (
        <div>
          <div
            className="color-box"
            style={{
              width: 100,
              height: 50,
              border: "1px solid black",
              backgroundColor: color.split(" / ")[0],
            }}
          />
          <p>Picked Color: {color}</p>
        </div>
      )}
    </div>
  )
}

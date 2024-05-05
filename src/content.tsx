import cssText from "data-text:~style.css"
import type { PlasmoCSConfig, PlasmoGetInlineAnchor } from "plasmo"
import ReactDOM from "react-dom"

import InputBox from "~features/InputBox"

export const config: PlasmoCSConfig = {
  matches: ["https://*.linkedin.com/*"]
}
export const getStyle = () => {
  const style = document.createElement("style")
  style.textContent = cssText
  return style
}

export const getInlineAnchor: PlasmoGetInlineAnchor = async () =>
  document.querySelector(".msg-form__contenteditable")

function initLinkedIn() {
  const modal = document.createElement("div")
  modal.classList.add(
    "fixed",
    "w-full",
    "h-full",
    "top-0",
    "left-0",
    "flex",
    "justify-center",
    "items-center",
    "bg-gray-100",
    "p-6",
    "border",
    "rounded-md",
    "z-100"
  )

  modal.style.backgroundColor = "rgba(0,0,0,0.5)"
  modal.style.zIndex = "200"
  modal.classList.add("modal")

  // Create a container for the React component
  const reactContainer = document.createElement("div")
  reactContainer.classList.add("mx-auto", "my-auto", "mt-110", "w-1/3")

  // Append the container to the modal
  modal.appendChild(reactContainer)

  // Mount the InputBox component into the container
  ReactDOM.render(<InputBox />, reactContainer)

  const messageSec = document.querySelector(".msg-form__msg-content-container")
  if (messageSec) {
    messageSec.appendChild(modal)
  }

  document.addEventListener("click", handleClickOutside, true)
}
function handleClickOutside(event) {
  const modal = document.querySelector(".modal")
  const reactContainer = document.querySelector(".modal > div")

  if (modal.contains(event.target) && !reactContainer.contains(event.target)) {
    modal.remove()
    document.removeEventListener("click", handleClickOutside, true) // Remove the event listener to prevent further clicks
  }
}

const PlasmoOverlay = () => {
  return (
    <div className="w-full bg-orange-300">
      <div
        className="block p-6 max-w-xl bg-white rounded-full border border-gray-300 shadow-md dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
        style={{
          borderRadius: "50%",
          width: 32,
          height: 32,
          padding: 8,
          position: "absolute",
          right: 4,
          top: -35,
          bottom: -4
        }}
        onClick={() => initLinkedIn()}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor">
          <path d="M17.0007 1.20825 18.3195 3.68108 20.7923 4.99992 18.3195 6.31876 17.0007 8.79159 15.6818 6.31876 13.209 4.99992 15.6818 3.68108 17.0007 1.20825ZM10.6673 9.33325 15.6673 11.9999 10.6673 14.6666 8.00065 19.6666 5.33398 14.6666.333984 11.9999 5.33398 9.33325 8.00065 4.33325 10.6673 9.33325ZM11.4173 11.9999 9.18905 10.8115 8.00065 8.58325 6.81224 10.8115 4.58398 11.9999 6.81224 13.1883 8.00065 15.4166 9.18905 13.1883 11.4173 11.9999ZM19.6673 16.3333 18.0007 13.2083 16.334 16.3333 13.209 17.9999 16.334 19.6666 18.0007 22.7916 19.6673 19.6666 22.7923 17.9999 19.6673 16.3333Z"></path>
        </svg>
      </div>
    </div>
  )
}

export default PlasmoOverlay

import React, { useState } from "react"

import "remixicon/fonts/remixicon.css"
import "~style.css"

const InputBox = () => {
  const [input, setInput] = useState("")
  const [msg, setMsg] = useState([])
  const handleInput = () => {
    setMsg([
      ...msg,
      {
        prompt: input,
        response:
          "Thank You, for the opportunity. If you have more questions or if there is anything else i can help with, feel free to ask"
      }
    ])
    console.log(msg)
    setInput("")
  }

  const handleInsert = () => {
    const contentEditableDiv = document.querySelector(
      ".msg-form__contenteditable"
    )
    const text = msg[0].response

    if (contentEditableDiv instanceof HTMLDivElement) {
      // remove all children of contentEditableDiv
      while (contentEditableDiv.firstChild) {
        contentEditableDiv.removeChild(contentEditableDiv.firstChild)
      }

      // create a new <p> with text content and add it as child to contentEditableDiv
      const p = document.createElement("p")
      p.textContent = text
      contentEditableDiv.appendChild(p)

      // go to parent of contentEditableDiv, then inside it find last div child. that is the placeholder text button
      // make aria-hidden="true" to that
      const parent = contentEditableDiv.parentElement
      const lastChild = parent.lastElementChild
      if (lastChild instanceof HTMLDivElement) {
        lastChild.setAttribute("aria-hidden", "true")
        // set data-placeholder to empty string
        lastChild.setAttribute("data-placeholder", "")
      }
    }

    closeModal()
  }

  function closeModal() {
    const modal = document.querySelector(".modal")
    modal.remove()
  }

  return (
    <div className="w-full h-auto p-3 items-center mx-auto bg-gray-100 rounded-lg ">
      <div className="flex flex-col w-full">
        {msg.map((item, index) => (
          <div
            key={index}
            className="flex flex-col gap-2 w-full rounded-xl p-2">
            <div className="p-2 rounded-xl ml-auto text-right bg-gray-300 flex justify-end ">
              {item.prompt}
            </div>
            <div className="p-2 rounded-xl text-left bg-blue-200 flex justify-start">
              {item.response}
            </div>
          </div>
        ))}
      </div>
      <div className="p-3 w-full border-hidden ">
        <input
          id="margin-none"
          className="px-2 pb-2 border-gray-600 border-1 w-full remove-focus-custom outline-none focus:outline-none ring-none focus:ring-0"
          value={input}
          placeholder="Your Prompt"
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault()
              handleInput()
            }
          }}
        />
      </div>
      <div className="flex flex-row justify-end items-center gap-2 mr-2">
        {msg.length !== 0 && (
          <button
            className="py-3 px-5 bg-gray-100 rounded-lg border-2 border-gray-300 hover:border-grey border-solid text-xl relative flex items-center"
            onClick={handleInsert}>
            <span className="mr-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-8 h-8">
                <path d="M13 12H20L12 20L4 12H11V4H13V12Z" />
              </svg>
            </span>
            <span className="text-black font-semibold">Insert</span>
          </button>
        )}

        <button
          className="py-3 px-5 ml-2 bg-blue-500 rounded-lg border-transparent border hover:border-grey border-solid relative flex items-center "
          onClick={handleInput}>
          {msg.length === 0 ? (
            <svg
              className="w-6 h-6"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="white">
              <path d="M3 12.9999H9V10.9999H3V1.84558C3 1.56944 3.22386 1.34558 3.5 1.34558C3.58425 1.34558 3.66714 1.36687 3.74096 1.40747L22.2034 11.5618C22.4454 11.6949 22.5337 11.9989 22.4006 12.2409C22.3549 12.324 22.2865 12.3924 22.2034 12.4381L3.74096 22.5924C3.499 22.7255 3.19497 22.6372 3.06189 22.3953C3.02129 22.3214 3 22.2386 3 22.1543V12.9999Z" />
            </svg>
          ) : (
            <svg
              className="w-6 h-6"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="white">
              <path d="M5.46257 4.43262C7.21556 2.91688 9.5007 2 12 2C17.5228 2 22 6.47715 22 12C22 14.1361 21.3302 16.1158 20.1892 17.7406L17 12H20C20 7.58172 16.4183 4 12 4C9.84982 4 7.89777 4.84827 6.46023 6.22842L5.46257 4.43262ZM18.5374 19.5674C16.7844 21.0831 14.4993 22 12 22C6.47715 22 2 17.5228 2 12C2 9.86386 2.66979 7.88416 3.8108 6.25944L7 12H4C4 16.4183 7.58172 20 12 20C14.1502 20 16.1022 19.1517 17.5398 17.7716L18.5374 19.5674Z" />
            </svg>
          )}
          <span className="ml-2 text-white text-xl font-semibold">
            {msg.length === 0 ? "Generate" : "Regenerate"}
          </span>
        </button>
      </div>
    </div>
  )
}

export default InputBox

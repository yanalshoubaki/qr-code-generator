import React, { useState, useRef, useEffect } from "react";
import QRCodeStyling from "qr-code-styling";
import logo from "./assets/images/logo.svg";
const App = () => {
  const [fileExt, setFileExt] = useState("svg");

  const [state, setState] = useState({
    width: 300,
    height: 300,
    type: "svg",
    data: "http://qr-code-styling.com",
    image: logo,
    margin: 10,
    qrOptions: {
      typeNumber: 0,
      mode: "Byte",
      errorCorrectionLevel: "Q",
    },
    imageOptions: {
      hideBackgroundDots: true,
      imageSize: 0.4,
      margin: 20,
      crossOrigin: "anonymous",
    },
    dotsOptions: {
      color: "#1a1a1a",
      type: "rounded",
    },
    backgroundOptions: {
      color: "#fff",
      // gradient: {
      //   type: 'linear', // 'radial'
      //   rotation: 0,
      //   colorStops: [{ offset: 0, color: '#ededff' }, { offset: 1, color: '#e6e7ff' }]
      // },
    },
    cornersSquareOptions: {
      color: "#222222",
      type: "extra-rounded",
      // gradient: {
      //   type: 'linear', // 'radial'
      //   rotation: 180,
      //   colorStops: [{ offset: 0, color: '#25456e' }, { offset: 1, color: '#4267b2' }]
      // },
    },
    cornersDotOptions: {
      color: "#222222",
      type: "dot",
      // gradient: {
      //   type: 'linear', // 'radial'
      //   rotation: 180,
      //   colorStops: [{ offset: 0, color: '#00266e' }, { offset: 1, color: '#4060b3' }]
      // },
    },
  });
  // const qrCode = useRef();
  const [qrCode] = useState(new QRCodeStyling(state));
  const ref = useRef(null);

  const handleChange = ({ target }) => {
    target.name === "width" &&
      setState((prevState) => ({
        ...prevState,
        width: target.value,
        height: target.value,
        imageOptions: {
          ...prevState.imageOptions,
          imageSize: target.value * 0.2,
        },
      }));
    target.name === "dotsOptions" &&
      setState((prevState) => ({
        ...prevState,
        dotsOptions: {
          ...prevState.dotsOptions,
          type: target.value,
        },
      }));
    // setState((prevState) => ({ ...prevState, [target.name]: target.value }));
  };

  const handleBackgroudChange = ({ target }) => {
    setState((prevState) => ({
      ...prevState,
      backgroundOptions: {
        [target.name]: target.value,
      },
    }));
  };

  const handleDotsChange = ({ target }) => {
    setState((prevState) => ({
      ...prevState,
      dotsOptions: {
        [target.name]: target.value,
      },
    }));
  };

  useEffect(() => {
    if (ref.current) {
      qrCode.append(ref.current);
    }
  }, [qrCode, ref]);

  useEffect(() => {
    if (!qrCode) return;
    qrCode.update(state);
  }, [qrCode, state]);

  const onDownloadClick = () => {
    if (!qrCode) return;
    qrCode.download({
      extension: fileExt,
    });
  };
  return (
    <div className="bg-slate-300 h-screen flex align-middle items-center">
      <div className="container mx-auto px-4">
        <div className="flex justify-center flex-row-reverse">
          <div className="w-2/6 flex justify-center items-center ">
            <div>
              <h3 className="text-xl font-bold mb-4">Qr Code Example</h3>
              <div ref={ref}></div>
              <div>
                <div className="flex mt-4">
                  <button
                    onClick={onDownloadClick}
                    type="button"
                    className="px-4 py-2 bg-green-400 text-white rounded mr-4 outline-none"
                  >
                    Download
                  </button>
                  <select
                    name="fileExt"
                    onChange={(e) => setFileExt(e.target.value)}
                    className="px-4 py-2 bg-slate-500 text-white rounded  outline-none"
                  >
                    <option value="PNG">png</option>
                    <option value="SVG">svg</option>
                    <option value="PNG">Png</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full max-w-md">
            <div className="bg-white  rounded px-8 pt-6 pb-8 mb-4">
              <div className="mb-4">
                <h1 className="text-2xl font-bold text-center text-gray-700">
                  Qr Code Generator
                </h1>
              </div>
              <div className="mb-4">
                <div className="formGroup mb-4">
                  <label className="block text-gray-700  font-bold mb-4 text-xl">
                    Data :
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    placeholder="Enter data"
                    name="data"
                    value={state.data}
                    onChange={handleBackgroudChange}
                  />
                </div>
                <div className="formGroup mb-4">
                  <label className="block text-gray-700  font-bold mb-4 text-xl">
                    Background Color :
                  </label>
                  <input
                    className="shadow appearance-none "
                    type="color"
                    placeholder="Enter value"
                    name="color"
                    value={state.backgroundOptions.color}
                    onChange={handleBackgroudChange}
                  />
                </div>
                <div className="formGroup mb-4">
                  <label className="block text-gray-700  font-bold mb-4 text-xl">
                    Dots color :
                  </label>
                  <input
                    className="shadow "
                    type="color"
                    placeholder="Enter value"
                    name="color"
                    value={state.dotsOptions.color}
                    onChange={handleDotsChange}
                  />
                </div>
                <div className="formGroup mb-4">
                  <label className="block font-bold mb-4 text-xl">
                    Qr style :
                  </label>
                  <label className="inline-flex items-center text-sm font-bold mb-2 mr-4">
                    <input
                      type="radio"
                      className="form-radio h-5 w-5 text-gray-700 "
                      name="dotsOptions"
                      onChange={handleChange}
                      value="rounded"
                      checked={state.dotsOptions.type === "rounded"}
                    />
                    <span className="ml-2 text-gray-700">rounded</span>
                  </label>
                  <label className="inline-flex items-center text-sm font-bold mb-2 mr-4">
                    <input
                      type="radio"
                      className="form-radio h-5 w-5 text-gray-700 "
                      name="dotsOptions"
                      onChange={handleChange}
                      value="dots"
                      checked={state.dotsOptions.type === "dots"}
                    />
                    <span className="ml-2 text-gray-700">dots</span>
                  </label>
                  <label className="inline-flex items-center text-sm font-bold mb-3  ">
                    <input
                      type="radio"
                      className="form-radio h-5 w-5 text-gray-700"
                      name="dotsOptions"
                      value="classy"
                      onChange={handleChange}
                      checked={state.dotsOptions.type === "classy"}
                    />
                    <span className="ml-2 text-gray-700 ">classy</span>
                  </label>
                  <label className="inline-flex items-center text-sm font-bold mb-3  ">
                    <input
                      type="radio"
                      className="form-radio h-5 w-5 text-gray-700"
                      name="dotsOptions"
                      value="classy-rounded"
                      onChange={handleChange}
                      checked={state.dotsOptions.type === "classy-rounded"}
                    />
                    <span className="ml-2 text-gray-700 ">classy-rounded</span>
                  </label>
                  <label className="inline-flex items-center text-sm font-bold mb-3  ">
                    <input
                      type="radio"
                      className="form-radio h-5 w-5 text-gray-700"
                      name="dotsOptions"
                      value="extra-rounded"
                      onChange={handleChange}
                      checked={state.dotsOptions.type === "extra-rounded"}
                    />
                    <span className="ml-2 text-gray-700 ">extra-rounded</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;

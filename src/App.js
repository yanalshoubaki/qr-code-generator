import React, { useState, useRef, useEffect } from "react";
import QRCodeStyling from "qr-code-styling";
import logo from "./assets/images/logo.svg";
import { Accordion, Col, Container, Row } from "react-bootstrap";
const App = () => {
  const [fileExt, setFileExt] = useState("svg");

  const [state, setState] = useState({
    width: 400,
    height: 400,
    type: "canvas",
    data: "https://www.facebook.com/groups/CNE.FET",
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
      type: "square",
    },
    backgroundOptions: {
      color: "#fff",
    },
    cornersSquareOptions: {
      color: "#222222",
      type: "square",
    },
    cornersDotOptions: {
      color: "#222222",
      type: "square",
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

  const handleBackgroundChange = ({ target }) => {
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
  const handleSizeChange = ({ target }) => {
    setState((prevState) => ({
      ...prevState,
      width: target.value,
      height: target.value,
    }));
  };
  const handleEyeFrameChange = ({ target }) => {
    setState((prevState) => ({
      ...prevState,
      cornersSquareOptions: {
        [target.name]: target.value,
      },
    }));
  };

  const handleEyeDotChange = ({ target }) => {
    setState((prevState) => ({
      ...prevState,
      cornersDotOptions:
        target.name == "type1"
          ? { type: target.value }
          : { [target.name]: target.value },
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
    <div className="bg-slate-300 min-h-screen min-w-screen flex align-middle items-center">
      <Container className="mx-auto px-4">
        <Row className="justify-around flex-row-reverse m-4">
          <Col md={4}>
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
                  <option value="" selected>
                    choose image type
                  </option>
                  <option value="SVG">svg</option>
                  <option value="PNG">png</option>
                </select>
              </div>
            </div>
          </Col>
          <Col md={6}>
            <div className="bg-white  rounded px-8 pt-6 pb-8 mb-4">
              <div className="mb-4">
                <h1 className="text-2xl font-bold text-center text-gray-700">
                  Qr Code Generator
                </h1>
              </div>
              <div className="mb-4">
                <Accordion defaultActiveKey="0">
                  <Accordion.Item eventKey="0">
                    <Accordion.Header>Qr content</Accordion.Header>
                    <Accordion.Body>
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
                          onChange={handleBackgroundChange}
                        />
                      </div>
                    </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey="1">
                    <Accordion.Header>Body option :</Accordion.Header>
                    <Accordion.Body>
                      <div className="formGroup mb-4">
                        <div className="flex justify-between">
                          <div>
                            <label className="block text-gray-700  font-bold mb-4 text-md">
                              Background Color :
                            </label>
                            <input
                              className="shadow appearance-none "
                              type="color"
                              placeholder="Enter value"
                              name="color"
                              value={state.backgroundOptions.color}
                              onChange={handleBackgroundChange}
                            />
                          </div>
                          <div>
                            <label className="block text-gray-700  font-bold mb-4 text-md">
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
                        </div>
                        <hr />
                        <div className="formGroup mb-4">
                          <label className="block  text-gray-700  font-bold mb-4 text-md">
                            Qr style :
                          </label>
                          <label className="inline-flex items-center text-sm font-bold mb-3 mr-4">
                            <input
                              type="radio"
                              className="form-radio h-5 w-5 text-gray-700"
                              name="dotsOptions"
                              value="square"
                              onChange={handleChange}
                              checked={state.dotsOptions.type === "square"}
                            />
                            <span className="ml-2 text-gray-700 ">square</span>
                          </label>
                          <label className="inline-flex items-center text-sm mr-4 text-gray-700  font-bold mb-4 text-md">
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
                          <label className="inline-flex items-center text-sm font-bold mb-3 mr-4">
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
                          <label className="inline-flex items-center text-sm font-bold mb-3 mr-4">
                            <input
                              type="radio"
                              className="form-radio h-5 w-5 text-gray-700"
                              name="dotsOptions"
                              value="classy-rounded"
                              onChange={handleChange}
                              checked={
                                state.dotsOptions.type === "classy-rounded"
                              }
                            />
                            <span className="ml-2 text-gray-700 ">
                              classy-rounded
                            </span>
                          </label>
                          <label className="inline-flex items-center text-sm font-bold mb-3 mr-4">
                            <input
                              type="radio"
                              className="form-radio h-5 w-5 text-gray-700"
                              name="dotsOptions"
                              value="extra-rounded"
                              onChange={handleChange}
                              checked={
                                state.dotsOptions.type === "extra-rounded"
                              }
                            />
                            <span className="ml-2 text-gray-700 ">
                              extra-rounded
                            </span>
                          </label>
                        </div>
                      </div>
                    </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey="2">
                    <Accordion.Header>Eye option :</Accordion.Header>
                    <Accordion.Body>
                      <div className="formGroup mb-4">
                        <div className="flex justify-between">
                          <div>
                            <label className="block text-gray-700  font-bold mb-4 text-md">
                              Eye frame color :
                            </label>
                            <input
                              className="shadow appearance-none "
                              type="color"
                              placeholder="Enter value"
                              name="color"
                              value={state.cornersSquareOptions.color}
                              onChange={handleEyeFrameChange}
                            />
                          </div>
                          <div>
                            <label className="block text-gray-700  font-bold mb-4 text-md">
                              Eye dot color :
                            </label>
                            <input
                              className="shadow "
                              type="color"
                              placeholder="Enter value"
                              name="color"
                              value={state.cornersDotOptions.color}
                              onChange={handleEyeDotChange}
                            />
                          </div>
                        </div>
                        <hr />
                        <div className="formGroup mb-4">
                          <label className="block  text-gray-700  font-bold mb-4 text-md">
                            Eye dot style :
                          </label>
                          <label className="inline-flex items-center text-sm mr-4 text-gray-700  font-bold mb-4 text-md">
                            <input
                              type="radio"
                              className="form-radio h-5 w-5 text-gray-700 "
                              name="type1"
                              onChange={handleEyeDotChange}
                              value="dot"
                              checked={state.cornersDotOptions.type === "dot"}
                            />
                            <span className="ml-2 text-gray-700">Dot</span>
                          </label>
                          <label className="inline-flex items-center text-sm font-bold mb-2 mr-4">
                            <input
                              type="radio"
                              className="form-radio h-5 w-5 text-gray-700 "
                              name="type1"
                              onChange={handleEyeDotChange}
                              value="square"
                              checked={
                                state.cornersDotOptions.type === "square"
                              }
                            />
                            <span className="ml-2 text-gray-700">square</span>
                          </label>
                        </div>
                        <hr />
                        <div className="formGroup mb-4">
                          <label className="block  text-gray-700  font-bold mb-4 text-md">
                            Eye Frame style :
                          </label>
                          <label className="inline-flex items-center text-sm mr-4 text-gray-700  font-bold mb-4 text-md">
                            <input
                              type="radio"
                              className="form-radio h-5 w-5 text-gray-700 "
                              name="type"
                              onChange={handleEyeFrameChange}
                              value="dot"
                              checked={
                                state.cornersSquareOptions.type === "dot"
                              }
                            />
                            <span className="ml-2 text-gray-700">Dot</span>
                          </label>
                          <label className="inline-flex items-center text-sm font-bold mb-2 mr-4">
                            <input
                              type="radio"
                              className="form-radio h-5 w-5 text-gray-700 "
                              name="type"
                              onChange={handleEyeFrameChange}
                              value="square"
                              checked={
                                state.cornersSquareOptions.type === "square"
                              }
                            />
                            <span className="ml-2 text-gray-700">square</span>
                          </label>
                          <label className="inline-flex items-center text-sm font-bold mb-2 mr-4">
                            <input
                              type="radio"
                              className="form-radio h-5 w-5 text-gray-700 "
                              name="type"
                              onChange={handleEyeFrameChange}
                              value="extra-rounded"
                              checked={
                                state.cornersSquareOptions.type ===
                                "extra-rounded"
                              }
                            />
                            <span className="ml-2 text-gray-700">
                              extra-rounded
                            </span>
                          </label>
                        </div>
                      </div>
                    </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey="3">
                    <Accordion.Header>Qr option :</Accordion.Header>
                    <Accordion.Body>
                      <div className="formGroup mb-4">
                        <div className="flex justify-between">
                          <div>
                            <label className="block text-gray-700  font-bold mb-4 text-md">
                              size :
                            </label>
                            <input
                              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                              type="number"
                              placeholder="Enter data"
                              name="size"
                              max="400"
                              value={state.width}
                              onChange={handleSizeChange}
                            />
                          </div>
                        </div>
                      </div>
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default App;

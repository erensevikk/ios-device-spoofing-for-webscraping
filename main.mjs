import { chromium, devices } from "patchright";

(async () => {
  console.log("Starting browser...");
  let browser;

  const randomNumber = Math.floor(Math.random() * 100000000) + 1;
  const formattedNumber = String(randomNumber).padStart(8, "0");
  const userDataDir = `user-data-dir-${formattedNumber}`;
  console.log(userDataDir);

  // iPhone 14 Pro Max cihazı seçildi
  const singleDevice = devices["iPhone 14 Pro Max"];

  try {
    // Proxy başlatılması için kısa bekleme
    await new Promise((res) => setTimeout(res, 1500));
    browser = await chromium.launchPersistentContext(userDataDir, {
      extraHTTPHeaders: {
        //"Sec-Fetch-Site": "none",
        "Accept-Language": "tr-TR,tr;q=0.9",
        Accept: "*/*",
        "Accept-Encoding": "gzip, deflate, br",
      },
      channel: "chrome",
      ...singleDevice,
      args: [
        "--disable-blink-features=AutomationControlled",
        "--touch-events=enabled",
        "--ignore-certificate-errors",
        "--disable-client-side-phishing-detection",
        "--disable-component-extensions-with-background-pages",
        "--allow-pre-commit-input",
        "--disable-ipc-flooding-protection",
        "--metrics-recording-only",
        "--unsafely-disable-devtools-self-xss-warnings",
        "--disable-back-forward-cache",
        "--disable-features=ImprovedCookieControls,LazyFrameLoading,GlobalMediaControls,DestroyProfileOnBrowserClose,MediaRouter,DialMediaRouteProvider,AcceptCHFrame,AutoExpandDetailsElement,CertificateTransparencyComponentUpdater,AvoidUnnecessaryBeforeUnloadCheckSync,Translate,HttpsUpgrades,PaintHolding,ThirdPartyStoragePartitioning,LensOverlay,PlzDedicatedWorker",
        "--force-webrtc-ip-handling-policy=default_public_interface_only",
        "--disable-webrtc-hw-decoding",
        "--disable-webrtc-encryption",
        "--disable-features=WebRtcHideLocalIpsWithMdns",
      ],
      headless: false,
      viewport: { width: 430, height: 873 }, // iPhone 14 Pro Max viewport
      screen: { width: 430, height: 932 }, // iPhone 14 Pro Max ekran boyutu
      userAgent:
        "Mozilla/5.0 (iPhone; CPU iPhone OS 18_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/139.0.7258.60 Mobile/15E148 Safari/604.1",
      isMobile: true,
      hasTouch: true,
      deviceScaleFactor: 3,
      bypassCSP: true,
      // iPhone 14 Pro Max için devicePixelRatio
    });
    console.log("The browser was launched successfully.");

    const pages = browser.pages();
    const page = pages.length > 0 ? pages[0] : await browser.newPage();
    console.log("Page used:", page.url());

    // Sahteleme scriptlerini ekliyoruz

    await page.addInitScript(() => {
      // fpscanner objesini sahteleştirme
      // WebGL 1.0 için sahte parametreler
      const webgl1Params = {
        VERSION: "WebGL 1.0",
        SHADING_LANGUAGE_VERSION: "WebGL GLSL ES 1.0 (1.0)",
        VENDOR: "WebKit",
        RENDERER: "WebKit WebGL",
        MAX_VERTEX_ATTRIBS: 16,
        MAX_VERTEX_UNIFORM_VECTORS: 256,
        MAX_VARYING_VECTORS: 15,
        MAX_VERTEX_TEXTURE_IMAGE_UNITS: 16,
        MAX_TEXTURE_IMAGE_UNITS: 16,
        MAX_COMBINED_TEXTURE_IMAGE_UNITS: 32,
        MAX_TEXTURE_SIZE: 16384,
        MAX_CUBE_MAP_TEXTURE_SIZE: 16384,
        MAX_RENDERBUFFER_SIZE: 16384,
        MAX_VIEWPORT_DIMS: [16384, 16384],
        ALIASED_LINE_WIDTH_RANGE: [1, 1],
        ALIASED_POINT_SIZE_RANGE: [1, 511],
        RED_BITS: 8,
        GREEN_BITS: 8,
        BLUE_BITS: 8,
        ALPHA_BITS: 8,
        DEPTH_BITS: 24,
        STENCIL_BITS: 0,
        MAX_VERTEX_UNIFORM_COMPONENTS: 4096,
        MAX_VARYING_COMPONENTS: 124,
        MAX_COMBINED_VERTEX_UNIFORM_COMPONENTS: 53248,
      };

      const webgl2Params = {
        VERSION: "WebGL 2.0",
        SHADING_LANGUAGE_VERSION: "WebGL GLSL ES 3.00",
        VENDOR: "WebKit",
        RENDERER: "WebKit WebGL",
        MAX_VERTEX_ATTRIBS: 16,
        MAX_VERTEX_UNIFORM_VECTORS: 1024,
        MAX_VARYING_VECTORS: 31,
        MAX_VERTEX_TEXTURE_IMAGE_UNITS: 16,
        MAX_TEXTURE_IMAGE_UNITS: 16,
        MAX_COMBINED_TEXTURE_IMAGE_UNITS: 32,
        MAX_TEXTURE_SIZE: 16384,
        MAX_CUBE_MAP_TEXTURE_SIZE: 16384,
        MAX_RENDERBUFFER_SIZE: 16384,
        MAX_VIEWPORT_DIMS: [16384, 16384],
        ALIASED_LINE_WIDTH_RANGE: [1, 1],
        ALIASED_POINT_SIZE_RANGE: [1, 511],
        RED_BITS: 8,
        GREEN_BITS: 8,
        BLUE_BITS: 8,
        ALPHA_BITS: 8,
        DEPTH_BITS: 24,
        STENCIL_BITS: 0,
        MAX_DRAW_BUFFERS: 8,
        MAX_COLOR_ATTACHMENTS: 8,
        MAX_SAMPLES: 4,
        MAX_3D_TEXTURE_SIZE: 2048,
        MAX_ARRAY_TEXTURE_LAYERS: 2048,
        MAX_UNIFORM_BUFFER_BINDINGS: 24,
        MAX_UNIFORM_BLOCK_SIZE: 16384,
        UNIFORM_BUFFER_OFFSET_ALIGNMENT: 16,
        MAX_VERTEX_UNIFORM_COMPONENTS: 4096,
        MAX_VERTEX_OUTPUT_COMPONENTS: 124,
        MAX_VARYING_COMPONENTS: 124,
        MAX_TRANSFORM_FEEDBACK_INTERLEAVED_COMPONENTS: 128,
        MAX_FRAGMENT_INPUT_COMPONENTS: 124,
        MAX_TEXTURE_LOD_BIAS: 15,
        MAX_COMBINED_VERTEX_UNIFORM_COMPONENTS: 53248,
        MAX_COMBINED_FRAGMENT_UNIFORM_COMPONENTS: 53248,
        EXTENSIONS: [
          "EXT_color_buffer_float",
          "EXT_color_buffer_half_float",
          "EXT_texture_filter_anisotropic",
          "EXT_texture_norm16",
          "KHR_parallel_shader_compile",
          "OES_draw_buffers_indexed",
          "WEBGL_clip_cull_distance",
          "WEBGL_compressed_texture_astc",
          "WEBGL_compressed_texture_etc",
          "WEBGL_compressed_texture_etc1",
          "WEBGL_compressed_texture_pvrtc",
          "WEBKIT_WEBGL_compressed_texture_pvrtc",
          "WEBGL_debug_renderer_info",
          "WEBGL_debug_shaders",
          "WEBGL_lose_context",
          "WEBGL_multi_draw",
          "WEBGL_provoking_vertex",
        ],
      };

      (function () {
        const originalGetContext = HTMLCanvasElement.prototype.getContext;
        HTMLCanvasElement.prototype.getContext = function (
          contextType,
          attributes
        ) {
          let modifiedAttributes = attributes ? { ...attributes } : {};
          if ("desynchronized" in modifiedAttributes) {
            delete modifiedAttributes.desynchronized;
            Object.defineProperty(modifiedAttributes, "desynchronized", {
              value: undefined,
              writable: false,
              configurable: true,
              enumerable: true,
            });
          }
          if ("xrCompatible" in modifiedAttributes) {
            delete modifiedAttributes.xrCompatible;
            Object.defineProperty(modifiedAttributes, "xrCompatible", {
              value: undefined,
              writable: false,
              configurable: true,
              enumerable: true,
            });
          }
          if (
            "unpackColorSpace" in modifiedAttributes ||
            "UNPACK_COLORSPACE_CONVERSION_WEBGL" in modifiedAttributes
          ) {
            delete modifiedAttributes.unpackColorSpace;
            delete modifiedAttributes.UNPACK_COLORSPACE_CONVERSION_WEBGL;
            Object.defineProperty(
              modifiedAttributes,
              "UNPACK_COLORSPACE_CONVERSION_WEBGL",
              {
                value: undefined,
                writable: false,
                configurable: true,
                enumerable: true,
              }
            );
          }

          const ctx = originalGetContext.call(
            this,
            contextType,
            modifiedAttributes || attributes
          );
          if (ctx) {
            let params;
            if (contextType === "webgl2") {
              params = webgl2Params;
            } else if (
              contextType === "webgl" ||
              contextType === "experimental-webgl" ||
              contextType === "webkit-3d"
            ) {
              params = webgl1Params;
            }
            if (params) {
              const paramMap = {};
              for (const [key, value] of Object.entries(params)) {
                if (key in ctx) {
                  paramMap[ctx[key]] = value;
                }
              }

              if (params.EXTENSIONS) {
                const originalGetSupportedExtensions =
                  ctx.getSupportedExtensions;
                ctx.getSupportedExtensions = function () {
                  return params.EXTENSIONS;
                };
              }

              const unpackColorSpaceConstant =
                ctx.UNPACK_COLORSPACE_CONVERSION_WEBGL;

              const originalGetParameter = ctx.getParameter;
              ctx.getParameter = function (param) {
                if (param === this.UNMASKED_VENDOR_WEBGL) return "WebKit";
                if (param === this.UNMASKED_RENDERER_WEBGL)
                  return "WebKit WebGL";
                if (param === unpackColorSpaceConstant || param === 0x9248)
                  return undefined;
                if (param in paramMap) return paramMap[param];
                return originalGetParameter.call(this, param);
              };

              Object.defineProperty(ctx, "UNPACK_COLORSPACE_CONVERSION_WEBGL", {
                get: () => undefined,
                set: () => {},
                configurable: true,
                enumerable: true,
              });

              Object.defineProperty(ctx, "unpackColorSpace", {
                get: () => undefined,
                set: () => {},
                configurable: true,
                enumerable: true,
              });

              Object.defineProperty(ctx, "desynchronized", {
                get: () => undefined,
                set: () => {},
                configurable: true,
                enumerable: true,
              });

              Object.defineProperty(ctx, "isContextXRCompatible", {
                get: () => undefined,
                set: () => {},
                configurable: true,
                enumerable: true,
              });

              const proto = Object.getPrototypeOf(ctx);
              if (proto) {
                if (!Object.getOwnPropertyDescriptor(proto, "desynchronized")) {
                  Object.defineProperty(proto, "desynchronized", {
                    get: () => undefined,
                    set: () => {},
                    configurable: true,
                    enumerable: true,
                  });
                }
                if (
                  !Object.getOwnPropertyDescriptor(
                    proto,
                    "isContextXRCompatible"
                  )
                ) {
                  Object.defineProperty(proto, "isContextXRCompatible", {
                    get: () => undefined,
                    set: () => {},
                    configurable: true,
                    enumerable: true,
                  });
                }
                if (
                  !Object.getOwnPropertyDescriptor(
                    proto,
                    "UNPACK_COLORSPACE_CONVERSION_WEBGL"
                  )
                ) {
                  Object.defineProperty(
                    proto,
                    "UNPACK_COLORSPACE_CONVERSION_WEBGL",
                    {
                      get: () => undefined,
                      set: () => {},
                      configurable: true,
                      enumerable: true,
                    }
                  );
                }
                if (
                  !Object.getOwnPropertyDescriptor(proto, "unpackColorSpace")
                ) {
                  Object.defineProperty(proto, "unpackColorSpace", {
                    get: () => undefined,
                    set: () => {},
                    configurable: true,
                    enumerable: true,
                  });
                }

                const originalGetParameterProto = proto.getParameter;
                if (originalGetParameterProto) {
                  proto.getParameter = function (param) {
                    if (param === unpackColorSpaceConstant || param === 0x9248)
                      return undefined;
                    return originalGetParameterProto.call(this, param);
                  };
                }
              }

              const originalGetContextAttributes = ctx.getContextAttributes;
              if (originalGetContextAttributes) {
                ctx.getContextAttributes = function () {
                  const attrs = originalGetContextAttributes.call(this);
                  if (attrs) {
                    Object.defineProperty(attrs, "desynchronized", {
                      get: () => undefined,
                      configurable: true,
                      enumerable: true,
                    });
                    Object.defineProperty(attrs, "xrCompatible", {
                      get: () => undefined,
                      configurable: true,
                      enumerable: true,
                    });
                    Object.defineProperty(attrs, "unpackColorSpace", {
                      get: () => undefined,
                      configurable: true,
                      enumerable: true,
                    });
                    Object.defineProperty(
                      attrs,
                      "UNPACK_COLORSPACE_CONVERSION_WEBGL",
                      {
                        get: () => undefined,
                        configurable: true,
                        enumerable: true,
                      }
                    );
                  }
                  return attrs;
                };
              }
            }
          }
          return ctx;
        };

        const spoofPropertiesInPrototype = (context) => {
          if (context && context.prototype) {
            if (
              !Object.getOwnPropertyDescriptor(
                context.prototype,
                "desynchronized"
              )
            ) {
              Object.defineProperty(context.prototype, "desynchronized", {
                get: () => undefined,
                set: () => {},
                configurable: true,
                enumerable: true,
              });
            }
            if (
              !Object.getOwnPropertyDescriptor(
                context.prototype,
                "isContextXRCompatible"
              )
            ) {
              Object.defineProperty(
                context.prototype,
                "isContextXRCompatible",
                {
                  get: () => undefined,
                  set: () => {},
                  configurable: true,
                  enumerable: true,
                }
              );
            }
            const unpackColorSpaceConstant =
              context.prototype.UNPACK_COLORSPACE_CONVERSION_WEBGL;
            if (
              unpackColorSpaceConstant &&
              !Object.getOwnPropertyDescriptor(
                context.prototype,
                "UNPACK_COLORSPACE_CONVERSION_WEBGL"
              )
            ) {
              Object.defineProperty(
                context.prototype,
                "UNPACK_COLORSPACE_CONVERSION_WEBGL",
                {
                  get: () => undefined,
                  set: () => {},
                  configurable: true,
                  enumerable: true,
                }
              );
            }
            if (
              !Object.getOwnPropertyDescriptor(
                context.prototype,
                "unpackColorSpace"
              )
            ) {
              Object.defineProperty(context.prototype, "unpackColorSpace", {
                get: () => undefined,
                set: () => {},
                configurable: true,
                enumerable: true,
              });
            }

            const originalGetParameterProto = context.prototype.getParameter;
            if (originalGetParameterProto) {
              context.prototype.getParameter = function (param) {
                if (param === unpackColorSpaceConstant || param === 0x9248)
                  return undefined;
                return originalGetParameterProto.call(this, param);
              };
            }
          }
        };

        if (window.WebGLRenderingContext) {
          spoofPropertiesInPrototype(WebGLRenderingContext);
        }
        if (window.WebGL2RenderingContext) {
          spoofPropertiesInPrototype(WebGL2RenderingContext);
        }

        const spoofGetContextAttributes = (context) => {
          if (context && context.prototype) {
            const originalGetContextAttributes =
              context.prototype.getContextAttributes;
            if (originalGetContextAttributes) {
              context.prototype.getContextAttributes = function () {
                const attrs = originalGetContextAttributes.call(this);
                if (attrs) {
                  Object.defineProperty(attrs, "desynchronized", {
                    get: () => undefined,
                    configurable: true,
                    enumerable: true,
                  });
                  Object.defineProperty(attrs, "xrCompatible", {
                    get: () => undefined,
                    configurable: true,
                    enumerable: true,
                  });
                  Object.defineProperty(attrs, "unpackColorSpace", {
                    get: () => undefined,
                    configurable: true,
                    enumerable: true,
                  });
                  Object.defineProperty(
                    attrs,
                    "UNPACK_COLORSPACE_CONVERSION_WEBGL",
                    {
                      get: () => undefined,
                      configurable: true,
                      enumerable: true,
                    }
                  );
                }
                return attrs;
              };
            }
          }
        };

        if (window.WebGLRenderingContext) {
          spoofGetContextAttributes(WebGLRenderingContext);
        }
        if (window.WebGL2RenderingContext) {
          spoofGetContextAttributes(WebGL2RenderingContext);
        }
      })();

      Object.defineProperty(window, "fpscanner", {
        value: () => ({}),
        writable: false,
        configurable: false,
      });

      const originalSetTimeout = window.setTimeout;
      window.setTimeout = function (callback, delay) {
        if (
          typeof callback === "function" &&
          callback.toString().includes("fpscanner")
        ) {
          console.log("fpscanner setTimeout engellendi");
          return;
        }
        return originalSetTimeout.apply(this, arguments);
      };

      const originalRTCPeerConnection =
        window.RTCPeerConnection || window.webkitRTCPeerConnection;
      if (originalRTCPeerConnection) {
        const fakeRTC = function (...args) {
          const pc = new originalRTCPeerConnection(...args);
          pc.createDataChannel = () => {};
          pc.onicecandidate = null;
          return pc;
        };
        window.RTCPeerConnection = fakeRTC;
        window.webkitRTCPeerConnection = fakeRTC;
      }
      Object.defineProperty(window.RTCPeerConnection, "toString", {
        value: () => "function RTCPeerConnection() { [native code] }",
      });

      Object.defineProperty(Intl.NumberFormat.prototype, "resolvedOptions", {
        value: function () {
          return {
            locale: "tr-TR",
            numberingSystem: "latn",
            style: "decimal",
            minimumFractionDigits: 0,
            maximumFractionDigits: 2,
          };
        },
        writable: false,
        configurable: true,
      });

      Object.defineProperty(Intl.Collator.prototype, "resolvedOptions", {
        value: function () {
          return {
            locale: "tr-TR",
            usage: "sort",
            sensitivity: "variant",
            ignorePunctuation: false,
            numeric: false,
            caseFirst: "false",
          };
        },
        writable: false,
        configurable: true,
      });

      window.addEventListener(
        "error",
        (event) => {
          if (event.target.tagName === "IMG") {
            event.target.width = 20;
            event.target.height = 20;
          }
        },
        true
      );

      const originalMatchMedia = window.matchMedia;
      window.matchMedia = (query) => {
        const result = originalMatchMedia(query);
        const normalizedQuery = query.toLowerCase().replace(/\s/g, "");
        if (
          normalizedQuery.includes("(color-gamut:srgb)") ||
          normalizedQuery.includes("(color-gamut:p3)")
        ) {
          const mediaQueryList = {
            matches: true,
            media: query,
            onchange: null,
            addListener: (callback) => {
              mediaQueryList.onchange = callback;
            },
            removeListener: (callback) => {
              if (mediaQueryList.onchange === callback) {
                mediaQueryList.onchange = null;
              }
            },
            addEventListener: (type, listener) => {
              if (type === "change") {
                mediaQueryList.onchange = listener;
              }
            },
            removeEventListener: (type, listener) => {
              if (type === "change" && mediaQueryList.onchange === listener) {
                mediaQueryList.onchange = null;
              }
            },
            dispatchEvent: (event) => {
              if (event.type === "change" && mediaQueryList.onchange) {
                mediaQueryList.onchange(event);
                return true;
              }
              return false;
            },
          };
          Object.setPrototypeOf(mediaQueryList, MediaQueryList.prototype);
          return mediaQueryList;
        }
        return result;
      };

      // **Screen Özellikleri için sahteleme**
      const screenProxy = new Proxy(screen, {
        get(target, prop) {
          if (prop === "width") return 430;
          if (prop === "height") return 932;
          if (prop === "availWidth") return 430;
          if (prop === "availHeight") return 932;
          if (prop === "colorDepth") return 24;
          if (prop === "pixelDepth") return 24;
          if (prop === "availTop") return 0;
          if (prop === "availLeft") return 0;
          if (prop === "orientation") {
            return {
              type: "portrait-primary",
              angle: 0,
              onchange: null,
              addEventListener: () => {},
              removeEventListener: () => {},
              dispatchEvent: () => {},
            };
          }
          return Reflect.get(target, prop);
        },
      });

      Object.defineProperty(navigator, "webdriver", {
        get: () => false,
        configurable: true,
        enumerable: true,
      });

      Object.defineProperty(window, "screen", {
        value: screenProxy,
        writable: false,
        configurable: true,
        enumerable: true,
      });

      // **Window Özellikleri**
      Object.defineProperty(window, "innerWidth", {
        get: () => 430,
        configurable: true,
      });
      Object.defineProperty(window, "innerHeight", {
        get: () => 873,
        configurable: true,
      });
      Object.defineProperty(window, "outerWidth", {
        get: () => 430,
        configurable: true,
      });
      Object.defineProperty(window, "outerHeight", {
        get: () => 932,
        configurable: true,
      });
      Object.defineProperty(window, "devicePixelRatio", {
        get: () => 3,
        configurable: true,
      });

      // **div.clientHeight için sahteleme**
      Object.defineProperty(HTMLElement.prototype, "clientHeight", {
        get: function () {
          if (this.tagName === "DIV" && this.id === "test-div") {
            return 873; // browserleaks'in test div'i için
          }
          const style = window.getComputedStyle(this);
          return (
            parseInt(style.height) || this.getBoundingClientRect().height || 873
          );
        },
        configurable: true,
      });

      // **Navigator için Proxy ile tam kontrol**
      const desiredNavigator = {
        // Temel özellikler (Navigator Object için)
        userAgent:
          "Mozilla/5.0 (iPhone; CPU iPhone OS 18_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/139.0.7258.60 Mobile/15E148 Safari/604.1",
        appVersion:
          "5.0 (iPhone; CPU iPhone OS 17_3_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/133.0.6943.120 Mobile/15E148 Safari/604.1",
        //appName: "Netscape",
        appCodeName: "Mozilla",
        product: "Gecko",
        productSub: "20030107",
        vendor: "Apple Computer, Inc.",
        vendorSub: "empty",
        platform: "iPhone",
        onLine: true,
        doNotTrack: undefined,
        cookieEnabled: true,
        maxTouchPoints: 5,
        pdfViewerEnabled: true,

        sendBeacon: function sendBeacon() {
          throw new Error("sendBeacon is not implemented");
        },
        requestMediaKeySystemAccess: function requestMediaKeySystemAccess() {
          throw new Error("requestMediaKeySystemAccess is not implemented");
        },
        getGamepads: function getGamepads() {
          throw new Error("getGamepads is not implemented");
        },
        javaEnabled: function javaEnabled() {
          throw new Error("javaEnabled is not implemented");
        },
        canShare: function canShare() {
          throw new Error("canShare is not implemented");
        },
        share: function share() {
          throw new Error("share is not implemented");
        },
      };

      // Fonksiyonların toString değerlerini native code gibi göster
      const spoofFunction = (fn, name) => {
        Object.defineProperty(fn, "toString", {
          value: () => `function ${name}() { [native code] }`,
          configurable: true,
        });
        return fn;
      };

      desiredNavigator.sendBeacon = spoofFunction(
        desiredNavigator.sendBeacon,
        "sendBeacon"
      );
      desiredNavigator.requestMediaKeySystemAccess = spoofFunction(
        desiredNavigator.requestMediaKeySystemAccess,
        "requestMediaKeySystemAccess"
      );
      desiredNavigator.getGamepads = spoofFunction(
        desiredNavigator.getGamepads,
        "getGamepads"
      );
      desiredNavigator.javaEnabled = spoofFunction(
        desiredNavigator.javaEnabled,
        "javaEnabled"
      );
      desiredNavigator.canShare = spoofFunction(
        desiredNavigator.canShare,
        "canShare"
      );
      desiredNavigator.share = spoofFunction(desiredNavigator.share, "share");

      // Navigator nesnesini Proxy ile sar

      const navigatorProxy = new Proxy(desiredNavigator, {
        get(target, prop) {
          if (prop === "appName") return "Netscape";
          if (prop === "language") return "tr-TR";
          if (prop === "languages") return ["tr-TR"];

          return Reflect.get(target, prop);
        },
        has(target, prop) {
          return Reflect.has(target, prop);
        },
        ownKeys(target) {
          return Reflect.ownKeys(target);
        },
        getOwnPropertyDescriptor(target, prop) {
          if (prop === "appName") {
            return {
              value: "Netscape",
              writable: false,
              enumerable: true,
              configurable: false,
            };
          }
          if (prop === "language") {
            return {
              value: "tr-TR",
              writable: false,
              enumerable: true,
              configurable: false,
            };
          }
          if (prop === "languages") {
            return {
              value: ["tr-TR"],
              writable: false,
              enumerable: true,
              configurable: false,
            };
          }
          return Reflect.getOwnPropertyDescriptor(target, prop);
        },
      });

      // Navigator'ı Proxy ile değiştir
      Object.defineProperty(window, "navigator", {
        value: navigatorProxy,
        configurable: true,
        writable: false,
      });

      const fakePermissions = {
        query: function query(permissionDescriptor) {
          return Promise.resolve({
            state: "prompt",
            onchange: null,
          });
        },
      };

      Object.defineProperty(fakePermissions, Symbol.toStringTag, {
        value: "Permissions",
      });

      Object.defineProperty(fakePermissions.query, "toString", {
        value: () => "function query() { [native code] }",
      });

      Object.defineProperty(desiredNavigator, "permissions", {
        get: function () {
          return fakePermissions;
        },
        enumerable: true,
        configurable: true,
      });
      Object.defineProperty(
        Object.getOwnPropertyDescriptor(desiredNavigator, "permissions").get,
        "toString",
        {
          value: () => "function get permissions() { [native code] }",
        }
      );

      const originalGetContext = HTMLCanvasElement.prototype.getContext;
      HTMLCanvasElement.prototype.getContext = function (
        contextType,
        attributes
      ) {
        if (contextType === "webgl" || contextType === "experimental-webgl") {
          const context = originalGetContext.call(
            this,
            contextType,
            attributes
          );
          if (context) {
            const originalGetParameter = context.getParameter;
            context.getParameter = function (param) {
              if (param === 0x1f02) {
                // gl.VERSION
                return "WebGL 1.0";
              }
              return originalGetParameter.call(this, param);
            };
          }
          return context;
        }
        return originalGetContext.call(this, contextType, attributes);
      };

      // hardwareConcurrency spoofing (getter + native-like toString)
      Object.defineProperty(desiredNavigator, "hardwareConcurrency", {
        get: function () {
          return 4; // iPhone 14 Pro Max gerçek değerine daha yakın
        },
        enumerable: true,
        configurable: true,
      });

      Object.defineProperty(
        Object.getOwnPropertyDescriptor(desiredNavigator, "hardwareConcurrency")
          .get,
        "toString",
        {
          value: () => "function get hardwareConcurrency() { [native code] }",
        }
      );
      Object.defineProperty(desiredNavigator, "userAgent", {
        get: function () {
          return "Mozilla/5.0 (iPhone; CPU iPhone OS 18_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/139.0.7258.60 Mobile/15E148 Safari/604.1";
        },
        enumerable: true,
        configurable: true,
      });
      Object.defineProperty(
        Object.getOwnPropertyDescriptor(desiredNavigator, "userAgent").get,
        "toString",
        {
          value: () => "function get userAgent() { [native code] }",
        }
      );

      Object.defineProperty(desiredNavigator, "appVersion", {
        get: function () {
          return "5.0 (iPhone; CPU iPhone OS 17_3_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/133.0.6943.120 Mobile/15E148 Safari/604.1";
        },
        enumerable: true,
        configurable: true,
      });

      Object.defineProperty(
        Object.getOwnPropertyDescriptor(desiredNavigator, "appVersion").get,
        "toString",
        {
          value: () => "function get appVersion() { [native code] }",
        }
      );

      Object.defineProperty(desiredNavigator, "appCodeName", {
        get: function () {
          return "Mozilla";
        },
        enumerable: true,
        configurable: true,
      });
      Object.defineProperty(
        Object.getOwnPropertyDescriptor(desiredNavigator, "appCodeName").get,
        "toString",
        {
          value: () => "function get appCodeName() { [native code] }",
        }
      );
      Object.defineProperty(desiredNavigator, "productSub", {
        get: function () {
          return "20030107";
        },
        enumerable: true,
        configurable: true,
      });
      Object.defineProperty(
        Object.getOwnPropertyDescriptor(desiredNavigator, "productSub").get,
        "toString",
        {
          value: () => "function get productSub() { [native code] }",
        }
      );
      Object.defineProperty(desiredNavigator, "vendor", {
        get: function () {
          return "Apple Computer, Inc.";
        },
        enumerable: true,
        configurable: true,
      });
      Object.defineProperty(
        Object.getOwnPropertyDescriptor(desiredNavigator, "vendor").get,
        "toString",
        {
          value: () => "function get vendor() { [native code] }",
        }
      );
      Object.defineProperty(desiredNavigator, "vendorSub", {
        get: function () {
          return "";
        },
        enumerable: true,
        configurable: true,
      });
      Object.defineProperty(
        Object.getOwnPropertyDescriptor(desiredNavigator, "vendorSub").get,
        "toString",
        {
          value: () => "function get vendorSub() { [native code] }",
        }
      );
      Object.defineProperty(desiredNavigator, "product", {
        get: function () {
          return "Gecko";
        },
        enumerable: true,
        configurable: true,
      });
      Object.defineProperty(
        Object.getOwnPropertyDescriptor(desiredNavigator, "product").get,
        "toString",
        {
          value: () => "function get product() { [native code] }",
        }
      );
      Object.defineProperty(desiredNavigator, "platform", {
        get: function () {
          return "iPhone";
        },
        enumerable: true,
        configurable: true,
      });
      Object.defineProperty(
        Object.getOwnPropertyDescriptor(desiredNavigator, "platform").get,
        "toString",
        {
          value: () => "function get platform() { [native code] }",
        }
      );
      Object.defineProperty(desiredNavigator, "cookieEnabled", {
        get: function () {
          return true;
        },
        enumerable: true,
        configurable: true,
      });
      Object.defineProperty(
        Object.getOwnPropertyDescriptor(desiredNavigator, "cookieEnabled").get,
        "toString",
        {
          value: () => "function get cookieEnabled() { [native code] }",
        }
      );
      Object.defineProperty(desiredNavigator, "maxTouchPoints", {
        get: function () {
          return 5; // iPhone 14 Pro Max için doğru değer
        },
        enumerable: true,
        configurable: true,
      });
      Object.defineProperty(
        Object.getOwnPropertyDescriptor(desiredNavigator, "maxTouchPoints").get,
        "toString",
        {
          value: () => "function get maxTouchPoints() { [native code] }",
        }
      );
      Object.defineProperty(desiredNavigator, "pdfViewerEnabled", {
        get: function () {
          return true;
        },
        enumerable: true,
        configurable: true,
      });
      Object.defineProperty(
        Object.getOwnPropertyDescriptor(desiredNavigator, "pdfViewerEnabled")
          .get,
        "toString",
        {
          value: () => "function get pdfViewerEnabled() { [native code] }",
        }
      );
      Object.defineProperty(desiredNavigator, "onLine", {
        get: function () {
          return true; // veya navigator.connection.isConnected gibi dinamik de yapılabilir
        },
        enumerable: true,
        configurable: true,
      });
      Object.defineProperty(
        Object.getOwnPropertyDescriptor(desiredNavigator, "onLine").get,
        "toString",
        {
          value: () => "function get onLine() { [native code] }",
        }
      );
      Object.defineProperty(desiredNavigator, "standalone", {
        get: function () {
          return false; // Mobil tarayıcıda normalde böyledir
        },
        enumerable: true,
        configurable: true,
      });
      Object.defineProperty(
        Object.getOwnPropertyDescriptor(desiredNavigator, "standalone").get,
        "toString",
        {
          value: () => "function get standalone() { [native code] }",
        }
      );

      Object.defineProperty(HTMLMediaElement.prototype, "canPlayType", {
        value: function (type) {
          console.log("canPlayType called with type:", type); // Hata ayıklama için log (isteğe bağlı, testten sonra kaldırılabilir)

          // Önce video codec'lerini kontrol et
          if (type.includes("video/ogg")) return ""; // ogg: desteklenmiyor
          if (type.includes("video/mp4") && type.includes("avc1"))
            return "probably"; // h264: probably
          if (type.includes("video/webm")) return ""; // webm: desteklenmiyor
          if (type.includes("video/mp4") && type.includes("mp4v"))
            return "probably"; // mpeg4v: probably
          if (type.includes("video/mp4") && type.includes("mp4a"))
            return "probably"; // mpeg4a: probably
          if (type.includes("theora")) return ""; // theora: desteklenmiyor

          // Sonra ses codec'lerini kontrol et
          if (type.includes("audio/ogg")) return ""; // ogg: desteklenmiyor
          if (type.includes("audio/mpeg")) return "maybe"; // mp3: maybe
          if (type.includes("audio/wav")) return "probably"; // wav: probably
          if (
            type.includes("audio/mp4") ||
            type.includes("audio/x-m4a") ||
            (type.includes("mp4a") && !type.includes("video/"))
          )
            return "maybe"; // m4a: maybe
          if (type.includes("audio/aac")) return "maybe"; // aac: maybe

          // Diğer medya türleri için varsayılan davranış
          return "";
        },
        writable: true,
        configurable: true,
      });

      const fakeClipboard = {
        writeText: async () => {},
        readText: async () => "",
        // Gerekirse daha fazla fonksiyon eklenebilir
      };

      Object.defineProperty(fakeClipboard, Symbol.toStringTag, {
        value: "Clipboard",
      });

      Object.defineProperty(desiredNavigator, "clipboard", {
        get: function () {
          return fakeClipboard;
        },
        enumerable: true,
        configurable: true,
      });

      Object.defineProperty(
        Object.getOwnPropertyDescriptor(desiredNavigator, "clipboard").get,
        "toString",
        {
          value: () => "function get clipboard() { [native code] }",
        }
      );
      const fakeAudioSession = {};
      Object.defineProperty(fakeAudioSession, Symbol.toStringTag, {
        value: "AudioSession",
      });

      Object.defineProperty(desiredNavigator, "audioSession", {
        get: function () {
          return fakeAudioSession;
        },
        enumerable: true,
        configurable: true,
      });

      Object.defineProperty(
        Object.getOwnPropertyDescriptor(desiredNavigator, "audioSession").get,
        "toString",
        {
          value: () => "function get audioSession() { [native code] }",
        }
      );
      const fakeCredentials = {};
      Object.defineProperty(fakeCredentials, Symbol.toStringTag, {
        value: "CredentialsContainer",
      });

      Object.defineProperty(desiredNavigator, "credentials", {
        get: function () {
          return fakeCredentials;
        },
        enumerable: true,
        configurable: true,
      });

      Object.defineProperty(
        Object.getOwnPropertyDescriptor(desiredNavigator, "credentials").get,
        "toString",
        {
          value: () => "function get credentials() { [native code] }",
        }
      );
      const fakeGeolocation = {
        getCurrentPosition: () => {},
        watchPosition: () => {},
        clearWatch: () => {},
      };

      Object.defineProperty(fakeGeolocation, Symbol.toStringTag, {
        value: "Geolocation",
      });

      Object.defineProperty(desiredNavigator, "geolocation", {
        get: function () {
          return fakeGeolocation;
        },
        enumerable: true,
        configurable: true,
      });

      Object.defineProperty(
        Object.getOwnPropertyDescriptor(desiredNavigator, "geolocation").get,
        "toString",
        {
          value: () => "function get geolocation() { [native code] }",
        }
      );
      const fakeMediaCapabilities = {};
      Object.defineProperty(fakeMediaCapabilities, Symbol.toStringTag, {
        value: "MediaCapabilities",
      });

      Object.defineProperty(desiredNavigator, "mediaCapabilities", {
        get: function () {
          return fakeMediaCapabilities;
        },
        enumerable: true,
        configurable: true,
      });

      Object.defineProperty(
        Object.getOwnPropertyDescriptor(desiredNavigator, "mediaCapabilities")
          .get,
        "toString",
        {
          value: () => "function get mediaCapabilities() { [native code] }",
        }
      );
      // mediaSession
      const fakeMediaSession = {};
      Object.defineProperty(fakeMediaSession, Symbol.toStringTag, {
        value: "MediaSession",
      });
      Object.defineProperty(desiredNavigator, "mediaSession", {
        get: () => fakeMediaSession,
        enumerable: true,
        configurable: true,
      });
      Object.defineProperty(
        Object.getOwnPropertyDescriptor(desiredNavigator, "mediaSession").get,
        "toString",
        {
          value: () => "function get mediaSession() { [native code] }",
        }
      );

      // Sahte MediaDeviceInfo constructor'ı
      function FakeMediaDeviceInfo(kind, deviceId, label, groupId) {
        this.kind = kind;
        this.deviceId = deviceId;
        this.label = label;
        this.groupId = groupId;
      }

      // Sahte cihazlar listesi (1 mikrofon, 1 webcam)
      const fakeDevices = [
        new FakeMediaDeviceInfo(
          "audioinput",
          "microphone-1",
          "Built-in Microphone",
          "group-1"
        ), // Mikrofon
        new FakeMediaDeviceInfo(
          "videoinput",
          "webcam-1",
          "Built-in Webcam",
          "group-1"
        ), // Webcam
      ];

      // MediaDevices objesi için sahteleme
      const fakeMediaDevices = {
        enumerateDevices: async () => {
          console.log(
            "enumerateDevices çağrıldı, dönen cihazlar:",
            fakeDevices
          );
          return fakeDevices;
        },
        getUserMedia: async () => {
          throw new Error("getUserMedia is not implemented");
        },
      };

      // MediaDevices objesinin toStringTag'ini ayarla
      Object.defineProperty(fakeMediaDevices, Symbol.toStringTag, {
        value: "MediaDevices",
      });

      // enumerateDevices metodunun toString değerini native gibi göster
      Object.defineProperty(fakeMediaDevices.enumerateDevices, "toString", {
        value: () => "function enumerateDevices() { [native code] }",
        configurable: true,
      });

      // navigator.mediaDevices özelliğini sahteleştir
      Object.defineProperty(desiredNavigator, "mediaDevices", {
        get: () => fakeMediaDevices,
        enumerable: true,
        configurable: true,
      });
      Object.defineProperty(
        Object.getOwnPropertyDescriptor(desiredNavigator, "mediaDevices").get,
        "toString",
        {
          value: () => "function get mediaDevices() { [native code] }",
        }
      );

      // wakeLock
      const fakeWakeLock = {};
      Object.defineProperty(fakeWakeLock, Symbol.toStringTag, {
        value: "WakeLock",
      });
      Object.defineProperty(desiredNavigator, "wakeLock", {
        get: () => fakeWakeLock,
        enumerable: true,
        configurable: true,
      });
      Object.defineProperty(
        Object.getOwnPropertyDescriptor(desiredNavigator, "wakeLock").get,
        "toString",
        {
          value: () => "function get wakeLock() { [native code] }",
        }
      );

      // locks
      const fakeLocks = {};
      Object.defineProperty(fakeLocks, Symbol.toStringTag, {
        value: "LockManager",
      });
      Object.defineProperty(desiredNavigator, "locks", {
        get: () => fakeLocks,
        enumerable: true,
        configurable: true,
      });
      Object.defineProperty(
        Object.getOwnPropertyDescriptor(desiredNavigator, "locks").get,
        "toString",
        {
          value: () => "function get locks() { [native code] }",
        }
      );

      // userActivation
      const fakeUserActivation = {};
      Object.defineProperty(fakeUserActivation, Symbol.toStringTag, {
        value: "UserActivation",
      });
      Object.defineProperty(desiredNavigator, "userActivation", {
        get: () => fakeUserActivation,
        enumerable: true,
        configurable: true,
      });
      Object.defineProperty(
        Object.getOwnPropertyDescriptor(desiredNavigator, "userActivation").get,
        "toString",
        {
          value: () => "function get userActivation() { [native code] }",
        }
      );

      // serviceWorker
      const fakeServiceWorker = {};
      Object.defineProperty(fakeServiceWorker, Symbol.toStringTag, {
        value: "ServiceWorkerContainer",
      });
      Object.defineProperty(desiredNavigator, "serviceWorker", {
        get: () => fakeServiceWorker,
        enumerable: true,
        configurable: true,
      });
      Object.defineProperty(
        Object.getOwnPropertyDescriptor(desiredNavigator, "serviceWorker").get,
        "toString",
        {
          value: () => "function get serviceWorker() { [native code] }",
        }
      );

      // storage
      const fakeStorage = {};
      Object.defineProperty(fakeStorage, Symbol.toStringTag, {
        value: "StorageManager",
      });
      Object.defineProperty(desiredNavigator, "storage", {
        get: () => fakeStorage,
        enumerable: true,
        configurable: true,
      });
      Object.defineProperty(
        Object.getOwnPropertyDescriptor(desiredNavigator, "storage").get,
        "toString",
        {
          value: () => "function get storage() { [native code] }",
        }
      );
      Object.defineProperty(window, "speechSynthesis", {
        get: function () {
          // Sahte SpeechSynthesisVoice constructor'ı
          function FakeSpeechSynthesisVoice({ lang, name }) {
            this.voiceURI = name; // voiceURI olarak name kullanılıyor
            this.name = name.split(".").pop(); // name, URI'nin son kısmından türetiliyor (örneğin, "Meijia")
            this.lang = lang;
            this.localService = true; // Tüm sesler yerel hizmet olarak işaretleniyor
            this.default = false;
          }

          // Sesler listesi (verdiğiniz sırayla 185 ses + eksik Samantha sesi eklendi)
          const voices = [
            new FakeSpeechSynthesisVoice({
              lang: "ar-001",
              name: "com.apple.voice.compact.ar-001.Maged",
            }),
            new FakeSpeechSynthesisVoice({
              lang: "bg-BG",
              name: "com.apple.voice.compact.bg-BG.Daria",
            }),
            new FakeSpeechSynthesisVoice({
              lang: "ca-ES",
              name: "com.apple.voice.compact.ca-ES.Montserrat",
            }),
            new FakeSpeechSynthesisVoice({
              lang: "cs-CZ",
              name: "com.apple.voice.compact.cs-CZ.Zuzana",
            }),
            new FakeSpeechSynthesisVoice({
              lang: "da-DK",
              name: "com.apple.voice.compact.da-DK.Sara",
            }),
            new FakeSpeechSynthesisVoice({
              lang: "de-DE",
              name: "com.apple.eloquence.de-DE.Sandy",
            }),
            new FakeSpeechSynthesisVoice({
              lang: "de-DE",
              name: "com.apple.eloquence.de-DE.Shelley",
            }),
            new FakeSpeechSynthesisVoice({
              lang: "de-DE",
              name: "com.apple.eloquence.de-DE.Grandma",
            }),
            new FakeSpeechSynthesisVoice({
              lang: "de-DE",
              name: "com.apple.eloquence.de-DE.Grandpa",
            }),
            new FakeSpeechSynthesisVoice({
              lang: "de-DE",
              name: "com.apple.eloquence.de-DE.Eddy",
            }),
            new FakeSpeechSynthesisVoice({
              lang: "de-DE",
              name: "com.apple.eloquence.de-DE.Reed",
            }),
            new FakeSpeechSynthesisVoice({
              lang: "de-DE",
              name: "com.apple.voice.compact.de-DE.Anna",
            }),
            new FakeSpeechSynthesisVoice({
              lang: "de-DE",
              name: "com.apple.eloquence.de-DE.Rocko",
            }),
            new FakeSpeechSynthesisVoice({
              lang: "de-DE",
              name: "com.apple.eloquence.de-DE.Flo",
            }),
            new FakeSpeechSynthesisVoice({
              lang: "el-GR",
              name: "com.apple.voice.compact.el-GR.Melina",
            }),
            new FakeSpeechSynthesisVoice({
              lang: "en-AU",
              name: "com.apple.voice.compact.en-AU.Karen",
            }),
            new FakeSpeechSynthesisVoice({
              lang: "en-GB",
              name: "com.apple.eloquence.en-GB.Rocko",
            }),
            new FakeSpeechSynthesisVoice({
              lang: "en-GB",
              name: "com.apple.eloquence.en-GB.Shelley",
            }),
            new FakeSpeechSynthesisVoice({
              lang: "en-GB",
              name: "com.apple.voice.compact.en-GB.Daniel",
            }),
            new FakeSpeechSynthesisVoice({
              lang: "en-GB",
              name: "com.apple.eloquence.en-GB.Grandma",
            }),
            new FakeSpeechSynthesisVoice({
              lang: "en-GB",
              name: "com.apple.eloquence.en-GB.Grandpa",
            }),
            new FakeSpeechSynthesisVoice({
              lang: "en-GB",
              name: "com.apple.eloquence.en-GB.Flo",
            }),
            new FakeSpeechSynthesisVoice({
              lang: "en-GB",
              name: "com.apple.eloquence.en-GB.Eddy",
            }),
            new FakeSpeechSynthesisVoice({
              lang: "en-GB",
              name: "com.apple.eloquence.en-GB.Reed",
            }),
            new FakeSpeechSynthesisVoice({
              lang: "en-GB",
              name: "com.apple.eloquence.en-GB.Sandy",
            }),
            new FakeSpeechSynthesisVoice({
              lang: "en-IE",
              name: "com.apple.voice.compact.en-IE.Moira",
            }),
            new FakeSpeechSynthesisVoice({
              lang: "en-IN",
              name: "com.apple.voice.compact.en-IN.Rishi",
            }),
            new FakeSpeechSynthesisVoice({
              lang: "en-US",
              name: "com.apple.eloquence.en-US.Flo",
            }),
            new FakeSpeechSynthesisVoice({
              lang: "en-US",
              name: "com.apple.speech.synthesis.voice.Bahh",
            }),
            new FakeSpeechSynthesisVoice({
              lang: "en-US",
              name: "com.apple.speech.synthesis.voice.Albert",
            }),
            new FakeSpeechSynthesisVoice({
              lang: "en-US",
              name: "com.apple.speech.synthesis.voice.Fred",
            }),
            new FakeSpeechSynthesisVoice({
              lang: "en-US",
              name: "com.apple.speech.synthesis.voice.Hysterical",
            }),
            new FakeSpeechSynthesisVoice({
              lang: "en-US",
              name: "com.apple.speech.synthesis.voice.Organ",
            }),
            new FakeSpeechSynthesisVoice({
              lang: "en-US",
              name: "com.apple.speech.synthesis.voice.Cellos",
            }),
            new FakeSpeechSynthesisVoice({
              lang: "en-US",
              name: "com.apple.speech.synthesis.voice.Zarvox",
            }),
            new FakeSpeechSynthesisVoice({
              lang: "en-US",
              name: "com.apple.eloquence.en-US.Rocko",
            }),
            new FakeSpeechSynthesisVoice({
              lang: "en-US",
              name: "com.apple.eloquence.en-US.Shelley",
            }),
            new FakeSpeechSynthesisVoice({
              lang: "en-US",
              name: "com.apple.speech.synthesis.voice.Princess",
            }),
            new FakeSpeechSynthesisVoice({
              lang: "en-US",
              name: "com.apple.eloquence.en-US.Grandma",
            }),
            new FakeSpeechSynthesisVoice({
              lang: "en-US",
              name: "com.apple.eloquence.en-US.Eddy",
            }),
            new FakeSpeechSynthesisVoice({
              lang: "en-US",
              name: "com.apple.speech.synthesis.voice.Bells",
            }),
            new FakeSpeechSynthesisVoice({
              lang: "en-US",
              name: "com.apple.eloquence.en-US.Grandpa",
            }),
            new FakeSpeechSynthesisVoice({
              lang: "en-US",
              name: "com.apple.speech.synthesis.voice.Trinoids",
            }),
            new FakeSpeechSynthesisVoice({
              lang: "en-US",
              name: "com.apple.speech.synthesis.voice.Kathy",
            }),
            new FakeSpeechSynthesisVoice({
              lang: "en-US",
              name: "com.apple.eloquence.en-US.Reed",
            }),
            new FakeSpeechSynthesisVoice({
              lang: "en-US",
              name: "com.apple.speech.synthesis.voice.Boing",
            }),
            new FakeSpeechSynthesisVoice({
              lang: "en-US",
              name: "com.apple.speech.synthesis.voice.Whisper",
            }),
            new FakeSpeechSynthesisVoice({
              lang: "en-US",
              name: "com.apple.speech.synthesis.voice.Deranged",
            }),
            new FakeSpeechSynthesisVoice({
              lang: "en-US",
              name: "com.apple.speech.synthesis.voice.GoodNews",
            }),
            new FakeSpeechSynthesisVoice({
              lang: "en-US",
              name: "com.apple.speech.synthesis.voice.BadNews",
            }),
            new FakeSpeechSynthesisVoice({
              lang: "en-US",
              name: "com.apple.speech.synthesis.voice.Bubbles",
            }),
            new FakeSpeechSynthesisVoice({
              lang: "en-US",
              name: "com.apple.eloquence.en-US.Sandy",
            }),
            new FakeSpeechSynthesisVoice({
              lang: "en-US",
              name: "com.apple.speech.synthesis.voice.Junior",
            }),
            new FakeSpeechSynthesisVoice({
              lang: "en-US",
              name: "com.apple.speech.synthesis.voice.Ralph",
            }),
            new FakeSpeechSynthesisVoice({
              lang: "en-ZA",
              name: "com.apple.voice.compact.en-ZA.Tessa",
            }),
            new FakeSpeechSynthesisVoice({
              lang: "es-ES",
              name: "com.apple.eloquence.es-ES.Shelley",
            }),
            new FakeSpeechSynthesisVoice({
              lang: "es-ES",
              name: "com.apple.eloquence.es-ES.Grandma",
            }),
            new FakeSpeechSynthesisVoice({
              lang: "es-ES",
              name: "com.apple.eloquence.es-ES.Rocko",
            }),
            new FakeSpeechSynthesisVoice({
              lang: "es-ES",
              name: "com.apple.eloquence.es-ES.Grandpa",
            }),
            new FakeSpeechSynthesisVoice({
              lang: "es-ES",
              name: "com.apple.voice.compact.es-ES.Monica",
            }),
            new FakeSpeechSynthesisVoice({
              lang: "es-ES",
              name: "com.apple.eloquence.es-ES.Sandy",
            }),
            new FakeSpeechSynthesisVoice({
              lang: "es-ES",
              name: "com.apple.eloquence.es-ES.Flo",
            }),
            new FakeSpeechSynthesisVoice({
              lang: "es-ES",
              name: "com.apple.eloquence.es-ES.Eddy",
            }),
            new FakeSpeechSynthesisVoice({
              lang: "es-ES",
              name: "com.apple.eloquence.es-ES.Reed",
            }),
            new FakeSpeechSynthesisVoice({
              lang: "es-MX",
              name: "com.apple.eloquence.es-MX.Rocko",
            }),
            new FakeSpeechSynthesisVoice({
              lang: "es-MX",
              name: "com.apple.voice.compact.es-MX.Paulina",
            }),
            new FakeSpeechSynthesisVoice({
              lang: "es-MX",
              name: "com.apple.eloquence.es-MX.Flo",
            }),
            new FakeSpeechSynthesisVoice({
              lang: "es-MX",
              name: "com.apple.eloquence.es-MX.Sandy",
            }),
            new FakeSpeechSynthesisVoice({
              lang: "es-MX",
              name: "com.apple.eloquence.es-MX.Eddy",
            }),
            new FakeSpeechSynthesisVoice({
              lang: "es-MX",
              name: "com.apple.eloquence.es-MX.Shelley",
            }),
            new FakeSpeechSynthesisVoice({
              lang: "es-MX",
              name: "com.apple.eloquence.es-MX.Grandma",
            }),
            new FakeSpeechSynthesisVoice({
              lang: "es-MX",
              name: "com.apple.eloquence.es-MX.Reed",
            }),
            new FakeSpeechSynthesisVoice({
              lang: "es-MX",
              name: "com.apple.eloquence.es-MX.Grandpa",
            }),
            new FakeSpeechSynthesisVoice({
              lang: "fi-FI",
              name: "com.apple.eloquence.fi-FI.Shelley",
            }),
            new FakeSpeechSynthesisVoice({
              lang: "fi-FI",
              name: "com.apple.eloquence.fi-FI.Grandma",
            }),
            new FakeSpeechSynthesisVoice({
              lang: "fi-FI",
              name: "com.apple.eloquence.fi-FI.Grandpa",
            }),
            new FakeSpeechSynthesisVoice({
              lang: "fi-FI",
              name: "com.apple.eloquence.fi-FI.Sandy",
            }),
            new FakeSpeechSynthesisVoice({
              lang: "fi-FI",
              name: "com.apple.voice.compact.fi-FI.Satu",
            }),
            new FakeSpeechSynthesisVoice({
              lang: "fi-FI",
              name: "com.apple.eloquence.fi-FI.Eddy",
            }),
            new FakeSpeechSynthesisVoice({
              lang: "fi-FI",
              name: "com.apple.eloquence.fi-FI.Rocko",
            }),
            new FakeSpeechSynthesisVoice({
              lang: "fi-FI",
              name: "com.apple.eloquence.fi-FI.Reed",
            }),
            new FakeSpeechSynthesisVoice({
              lang: "fi-FI",
              name: "com.apple.eloquence.fi-FI.Flo",
            }),
            new FakeSpeechSynthesisVoice({
              lang: "fr-CA",
              name: "com.apple.eloquence.fr-CA.Shelley",
            }),
            new FakeSpeechSynthesisVoice({
              lang: "fr-CA",
              name: "com.apple.eloquence.fr-CA.Grandma",
            }),
            new FakeSpeechSynthesisVoice({
              lang: "fr-CA",
              name: "com.apple.eloquence.fr-CA.Grandpa",
            }),
            new FakeSpeechSynthesisVoice({
              lang: "fr-CA",
              name: "com.apple.eloquence.fr-CA.Rocko",
            }),
            new FakeSpeechSynthesisVoice({
              lang: "fr-CA",
              name: "com.apple.eloquence.fr-CA.Eddy",
            }),
            new FakeSpeechSynthesisVoice({
              lang: "fr-CA",
              name: "com.apple.eloquence.fr-CA.Reed",
            }),
            new FakeSpeechSynthesisVoice({
              lang: "fr-CA",
              name: "com.apple.voice.compact.fr-CA.Amelie",
            }),
            new FakeSpeechSynthesisVoice({
              lang: "fr-CA",
              name: "com.apple.eloquence.fr-CA.Flo",
            }),
            new FakeSpeechSynthesisVoice({
              lang: "fr-CA",
              name: "com.apple.eloquence.fr-CA.Sandy",
            }),
            new FakeSpeechSynthesisVoice({
              lang: "fr-FR",
              name: "com.apple.eloquence.fr-FR.Grandma",
            }),
            new FakeSpeechSynthesisVoice({
              lang: "fr-FR",
              name: "com.apple.eloquence.fr-FR.Flo",
            }),
            new FakeSpeechSynthesisVoice({
              lang: "fr-FR",
              name: "com.apple.eloquence.fr-FR.Rocko",
            }),
            new FakeSpeechSynthesisVoice({
              lang: "fr-FR",
              name: "com.apple.eloquence.fr-FR.Grandpa",
            }),
            new FakeSpeechSynthesisVoice({
              lang: "fr-FR",
              name: "com.apple.eloquence.fr-FR.Sandy",
            }),
            new FakeSpeechSynthesisVoice({
              lang: "fr-FR",
              name: "com.apple.eloquence.fr-FR.Eddy",
            }),
            new FakeSpeechSynthesisVoice({
              lang: "fr-FR",
              name: "com.apple.voice.compact.fr-FR.Thomas",
            }),
            new FakeSpeechSynthesisVoice({
              lang: "fr-FR",
              name: "com.apple.eloquence.fr-FR.Jacques",
            }),
            new FakeSpeechSynthesisVoice({
              lang: "fr-FR",
              name: "com.apple.eloquence.fr-FR.Shelley",
            }),
            new FakeSpeechSynthesisVoice({
              lang: "he-IL",
              name: "com.apple.voice.compact.he-IL.Carmit",
            }),
            new FakeSpeechSynthesisVoice({
              lang: "hi-IN",
              name: "com.apple.voice.compact.hi-IN.Lekha",
            }),
            new FakeSpeechSynthesisVoice({
              lang: "hr-HR",
              name: "com.apple.voice.compact.hr-HR.Lana",
            }),
            new FakeSpeechSynthesisVoice({
              lang: "hu-HU",
              name: "com.apple.voice.compact.hu-HU.Mariska",
            }),
            new FakeSpeechSynthesisVoice({
              lang: "id-ID",
              name: "com.apple.voice.compact.id-ID.Damayanti",
            }),
            new FakeSpeechSynthesisVoice({
              lang: "it-IT",
              name: "com.apple.eloquence.it-IT.Eddy",
            }),
            new FakeSpeechSynthesisVoice({
              lang: "it-IT",
              name: "com.apple.eloquence.it-IT.Sandy",
            }),
            new FakeSpeechSynthesisVoice({
              lang: "it-IT",
              name: "com.apple.eloquence.it-IT.Reed",
            }),
            new FakeSpeechSynthesisVoice({
              lang: "it-IT",
              name: "com.apple.eloquence.it-IT.Shelley",
            }),
            new FakeSpeechSynthesisVoice({
              lang: "it-IT",
              name: "com.apple.eloquence.it-IT.Grandma",
            }),
            new FakeSpeechSynthesisVoice({
              lang: "it-IT",
              name: "com.apple.eloquence.it-IT.Grandpa",
            }),
            new FakeSpeechSynthesisVoice({
              lang: "it-IT",
              name: "com.apple.eloquence.it-IT.Flo",
            }),
            new FakeSpeechSynthesisVoice({
              lang: "it-IT",
              name: "com.apple.eloquence.it-IT.Rocko",
            }),
            new FakeSpeechSynthesisVoice({
              lang: "it-IT",
              name: "com.apple.voice.compact.it-IT.Alice",
            }),
            new FakeSpeechSynthesisVoice({
              lang: "ja-JP",
              name: "com.apple.voice.compact.ja-JP.Kyoko",
            }),
            new FakeSpeechSynthesisVoice({
              lang: "ko-KR",
              name: "com.apple.voice.compact.ko-KR.Yuna",
            }),
            new FakeSpeechSynthesisVoice({
              lang: "ms-MY",
              name: "com.apple.voice.compact.ms-MY.Amira",
            }),
            new FakeSpeechSynthesisVoice({
              lang: "nb-NO",
              name: "com.apple.voice.compact.nb-NO.Nora",
            }),
            new FakeSpeechSynthesisVoice({
              lang: "nl-BE",
              name: "com.apple.voice.compact.nl-BE.Ellen",
            }),
            new FakeSpeechSynthesisVoice({
              lang: "nl-NL",
              name: "com.apple.voice.compact.nl-NL.Xander",
            }),
            new FakeSpeechSynthesisVoice({
              lang: "pl-PL",
              name: "com.apple.voice.compact.pl-PL.Zosia",
            }),
            new FakeSpeechSynthesisVoice({
              lang: "pt-BR",
              name: "com.apple.eloquence.pt-BR.Reed",
            }),
            new FakeSpeechSynthesisVoice({
              lang: "pt-BR",
              name: "com.apple.voice.compact.pt-BR.Luciana",
            }),
            new FakeSpeechSynthesisVoice({
              lang: "pt-BR",
              name: "com.apple.eloquence.pt-BR.Shelley",
            }),
            new FakeSpeechSynthesisVoice({
              lang: "pt-BR",
              name: "com.apple.eloquence.pt-BR.Grandma",
            }),
            new FakeSpeechSynthesisVoice({
              lang: "pt-BR",
              name: "com.apple.eloquence.pt-BR.Grandpa",
            }),
            new FakeSpeechSynthesisVoice({
              lang: "pt-BR",
              name: "com.apple.eloquence.pt-BR.Rocko",
            }),
            new FakeSpeechSynthesisVoice({
              lang: "pt-BR",
              name: "com.apple.eloquence.pt-BR.Flo",
            }),
            new FakeSpeechSynthesisVoice({
              lang: "pt-BR",
              name: "com.apple.eloquence.pt-BR.Sandy",
            }),
            new FakeSpeechSynthesisVoice({
              lang: "pt-BR",
              name: "com.apple.eloquence.pt-BR.Eddy",
            }),
            new FakeSpeechSynthesisVoice({
              lang: "pt-PT",
              name: "com.apple.voice.compact.pt-PT.Joana",
            }),
            new FakeSpeechSynthesisVoice({
              lang: "ro-RO",
              name: "com.apple.voice.compact.ro-RO.Ioana",
            }),
            new FakeSpeechSynthesisVoice({
              lang: "ru-RU",
              name: "com.apple.voice.compact.ru-RU.Milena",
            }),
            new FakeSpeechSynthesisVoice({
              lang: "sk-SK",
              name: "com.apple.voice.compact.sk-SK.Laura",
            }),
            new FakeSpeechSynthesisVoice({
              lang: "sv-SE",
              name: "com.apple.voice.compact.sv-SE.Alva",
            }),
            new FakeSpeechSynthesisVoice({
              lang: "th-TH",
              name: "com.apple.voice.compact.th-TH.Kanya",
            }),
            new FakeSpeechSynthesisVoice({
              lang: "uk-UA",
              name: "com.apple.voice.compact.uk-UA.Lesya",
            }),
            new FakeSpeechSynthesisVoice({
              lang: "vi-VN",
              name: "com.apple.voice.compact.vi-VN.Linh",
            }),
            new FakeSpeechSynthesisVoice({
              lang: "zh-CN",
              name: "com.apple.voice.compact.zh-CN.Tingting",
            }),
            new FakeSpeechSynthesisVoice({
              lang: "zh-HK",
              name: "com.apple.voice.compact.zh-HK.Sinji",
            }),
            new FakeSpeechSynthesisVoice({
              lang: "zh-TW",
              name: "com.apple.voice.compact.zh-TW.Meijia",
            }),
            new FakeSpeechSynthesisVoice({
              lang: "ca-ES",
              name: "com.apple.voice.super-compact.ca-ES.Montserrat",
            }),
            new FakeSpeechSynthesisVoice({
              lang: "en-GB",
              name: "com.apple.voice.super-compact.en-GB.Daniel",
            }),
            new FakeSpeechSynthesisVoice({
              lang: "zh-HK",
              name: "com.apple.voice.super-compact.zh-HK.Sinji",
            }),
            new FakeSpeechSynthesisVoice({
              lang: "fr-CA",
              name: "com.apple.voice.super-compact.fr-CA.Amelie",
            }),
            new FakeSpeechSynthesisVoice({
              lang: "fr-FR",
              name: "com.apple.voice.super-compact.fr-FR.Thomas",
            }),
            new FakeSpeechSynthesisVoice({
              lang: "en-US",
              name: "com.apple.voice.super-compact.en-US.Samantha",
            }),
            new FakeSpeechSynthesisVoice({
              lang: "id-ID",
              name: "com.apple.voice.super-compact.id-ID.Damayanti",
            }),
            new FakeSpeechSynthesisVoice({
              lang: "es-ES",
              name: "com.apple.voice.super-compact.es-ES.Monica",
            }),
            new FakeSpeechSynthesisVoice({
              lang: "pl-PL",
              name: "com.apple.voice.super-compact.pl-PL.Zosia",
            }),
            new FakeSpeechSynthesisVoice({
              lang: "hr-HR",
              name: "com.apple.voice.super-compact.hr-HR.Lana",
            }),
            new FakeSpeechSynthesisVoice({
              lang: "pt-BR",
              name: "com.apple.voice.super-compact.pt-BR.Luciana",
            }),
            new FakeSpeechSynthesisVoice({
              lang: "ro-RO",
              name: "com.apple.voice.super-compact.ro-RO.Ioana",
            }),
            new FakeSpeechSynthesisVoice({
              lang: "en-IE",
              name: "com.apple.voice.super-compact.en-IE.Moira",
            }),
            new FakeSpeechSynthesisVoice({
              lang: "nb-NO",
              name: "com.apple.voice.super-compact.nb-NO.Nora",
            }),
            new FakeSpeechSynthesisVoice({
              lang: "nl-NL",
              name: "com.apple.voice.super-compact.nl-NL.Xander",
            }),
            new FakeSpeechSynthesisVoice({
              lang: "ko-KR",
              name: "com.apple.voice.super-compact.ko-KR.Yuna",
            }),
            new FakeSpeechSynthesisVoice({
              lang: "en-IN",
              name: "com.apple.voice.super-compact.en-IN.Rishi",
            }),
            new FakeSpeechSynthesisVoice({
              lang: "it-IT",
              name: "com.apple.voice.super-compact.it-IT.Alice",
            }),
            new FakeSpeechSynthesisVoice({
              lang: "th-TH",
              name: "com.apple.voice.super-compact.th-TH.Kanya",
            }),
            new FakeSpeechSynthesisVoice({
              lang: "ja-JP",
              name: "com.apple.voice.super-compact.ja-JP.Kyoko",
            }),
            new FakeSpeechSynthesisVoice({
              lang: "vi-VN",
              name: "com.apple.voice.super-compact.vi-VN.Linh",
            }),
            new FakeSpeechSynthesisVoice({
              lang: "es-MX",
              name: "com.apple.voice.super-compact.es-MX.Paulina",
            }),
            new FakeSpeechSynthesisVoice({
              lang: "zh-CN",
              name: "com.apple.voice.super-compact.zh-CN.Tingting",
            }),
            new FakeSpeechSynthesisVoice({
              lang: "en-AU",
              name: "com.apple.voice.super-compact.en-AU.Karen",
            }),
            new FakeSpeechSynthesisVoice({
              lang: "el-GR",
              name: "com.apple.voice.super-compact.el-GR.Melina",
            }),
            new FakeSpeechSynthesisVoice({
              lang: "hi-IN",
              name: "com.apple.voice.super-compact.hi-IN.Lekha",
            }),
            new FakeSpeechSynthesisVoice({
              lang: "ms-MY",
              name: "com.apple.voice.super-compact.ms-MY.Amira",
            }),
            new FakeSpeechSynthesisVoice({
              lang: "fi-FI",
              name: "com.apple.voice.super-compact.fi-FI.Satu",
            }),
            new FakeSpeechSynthesisVoice({
              lang: "hu-HU",
              name: "com.apple.voice.super-compact.hu-HU.Mariska",
            }),
            new FakeSpeechSynthesisVoice({
              lang: "pt-PT",
              name: "com.apple.voice.super-compact.pt-PT.Joana",
            }),
            new FakeSpeechSynthesisVoice({
              lang: "bg-BG",
              name: "com.apple.voice.super-compact.bg-BG.Daria",
            }),
            new FakeSpeechSynthesisVoice({
              lang: "nl-BE",
              name: "com.apple.voice.super-compact.nl-BE.Ellen",
            }),
            new FakeSpeechSynthesisVoice({
              lang: "zh-TW",
              name: "com.apple.voice.super-compact.zh-TW.Meijia",
            }),
            new FakeSpeechSynthesisVoice({
              lang: "sk-SK",
              name: "com.apple.voice.super-compact.sk-SK.Laura",
            }),
            new FakeSpeechSynthesisVoice({
              lang: "uk-UA",
              name: "com.apple.voice.super-compact.uk-UA.Lesya",
            }),
            new FakeSpeechSynthesisVoice({
              lang: "ar-001",
              name: "com.apple.voice.super-compact.ar-001.Maged",
            }),
            new FakeSpeechSynthesisVoice({
              lang: "cs-CZ",
              name: "com.apple.voice.super-compact.cs-CZ.Zuzana",
            }),
            new FakeSpeechSynthesisVoice({
              lang: "ru-RU",
              name: "com.apple.voice.super-compact.ru-RU.Milena",
            }),
            new FakeSpeechSynthesisVoice({
              lang: "en-ZA",
              name: "com.apple.voice.super-compact.en-ZA.Tessa",
            }),
            new FakeSpeechSynthesisVoice({
              lang: "de-DE",
              name: "com.apple.voice.super-compact.de-DE.Anna",
            }),
            new FakeSpeechSynthesisVoice({
              lang: "tr-TR",
              name: "com.apple.voice.super-compact.tr-TR.Yelda",
            }),
            new FakeSpeechSynthesisVoice({
              lang: "sv-SE",
              name: "com.apple.voice.super-compact.sv-SE.Alva",
            }),
            new FakeSpeechSynthesisVoice({
              lang: "da-DK",
              name: "com.apple.voice.super-compact.da-DK.Sara",
            }),
            new FakeSpeechSynthesisVoice({
              lang: "he-IL",
              name: "com.apple.voice.super-compact.he-IL.Carmit",
            }),
          ];

          // Varsayılan sesi ayarla
          voices.forEach((voice) => {
            if (voice.voiceURI === "com.apple.voice.compact.ar-001.Maged") {
              voice.default = true;
              voice.name = "Maged"; // Varsayılan sesin adı Maged olmalı
            } else {
              voice.default = false;
            }
          });

          return {
            getVoices() {
              return voices;
            },
            speak() {},
            cancel() {},
            pause() {},
            resume() {},
            speaking: false,
            pending: false,
            paused: false,
            onvoiceschanged: null,
          };
        },
        configurable: true,
      });
      (() => {
        // Plugin örneği oluştur
        const plugins = [
          {
            name: "PDF Viewer",
            description: "Portable Document Format",
            filename: "internal-pdf-viewer",
            __proto__: Plugin.prototype,
          },
          {
            name: "Chrome PDF Viewer",
            description: "Portable Document Format",
            filename: "internal-pdf-viewer",
            __proto__: Plugin.prototype,
          },
          {
            name: "Chromium PDF Viewer",
            description: "Portable Document Format",
            filename: "internal-pdf-viewer",
            __proto__: Plugin.prototype,
          },
          {
            name: "Microsoft Edge PDF Viewer",
            description: "Portable Document Format",
            filename: "internal-pdf-viewer",
            __proto__: Plugin.prototype,
          },
          {
            name: "WebKit built-in PDF",
            description: "Portable Document Format",
            filename: "internal-pdf-viewer",
            __proto__: Plugin.prototype,
          },
        ];

        // Plugins dizisi oluştur
        const pluginArray = {
          length: plugins.length,
          item(index) {
            return this[index];
          },
          namedItem(name) {
            return plugins.find((p) => p.name === name) || null;
          },
          refresh: () => {},
          [Symbol.iterator]: function* () {
            for (let i = 0; i < plugins.length; i++) yield this[i];
          },
          __proto__: PluginArray.prototype,
        };
        plugins.forEach((p, i) => (pluginArray[i] = p));
        Object.defineProperty(pluginArray, Symbol.toStringTag, {
          value: "PluginArray",
        });

        // MimeType örneği oluştur
        const mimeTypes = [
          {
            type: "application/pdf",
            suffixes: "pdf",
            description: "PDF (Taşınabilir Belge Biçimi)",
            enabledPlugin: plugins[0],
            __proto__: MimeType.prototype,
          },
          {
            type: "text/pdf",
            suffixes: "pdf",
            description: "PDF (Taşınabilir Belge Biçimi)",
            enabledPlugin: plugins[0],
            __proto__: MimeType.prototype,
          },
        ];

        // MimeTypes dizisi oluştur
        const mimeTypeArray = {
          length: mimeTypes.length,
          item(index) {
            return this[index];
          },
          namedItem(name) {
            return mimeTypes.find((m) => m.type === name) || null;
          },
          [Symbol.iterator]: function* () {
            for (let i = 0; i < mimeTypes.length; i++) yield this[i];
          },
          __proto__: MimeTypeArray.prototype,
        };
        mimeTypes.forEach((m, i) => (mimeTypeArray[i] = m));
        Object.defineProperty(mimeTypeArray, Symbol.toStringTag, {
          value: "MimeTypeArray",
        });

        // Proxy navigator'a ekle
        Object.defineProperty(desiredNavigator, "plugins", {
          get: () => pluginArray,
          enumerable: true,
          configurable: true,
        });
        Object.defineProperty(
          Object.getOwnPropertyDescriptor(desiredNavigator, "plugins").get,
          "toString",
          {
            value: () => "function get plugins() { [native code] }",
          }
        );

        Object.defineProperty(desiredNavigator, "mimeTypes", {
          get: () => mimeTypeArray,
          enumerable: true,
          configurable: true,
        });
        Object.defineProperty(
          Object.getOwnPropertyDescriptor(desiredNavigator, "mimeTypes").get,
          "toString",
          {
            value: () => "function get mimeTypes() { [native code] }",
          }
        );
      })();

      // **Eklentiler ve mimeType sahtelemesi**
      (() => {
        const makePluginArray = () => {
          const plugins = [
            {
              name: "PDF Viewer",
              description: "Portable Document Format",
              filename: "internal-pdf-viewer",
              __proto__: Plugin.prototype,
            },
            {
              name: "Chrome PDF Viewer",
              description: "Portable Document Format",
              filename: "internal-pdf-viewer",
              __proto__: Plugin.prototype,
            },
            {
              name: "Chromium PDF Viewer",
              description: "Portable Document Format",
              filename: "internal-pdf-viewer",
              __proto__: Plugin.prototype,
            },
            {
              name: "Microsoft Edge PDF Viewer",
              description: "Portable Document Format",
              filename: "internal-pdf-viewer",
              __proto__: Plugin.prototype,
            },
            {
              name: "WebKit built-in PDF",
              description: "Portable Document Format",
              filename: "internal-pdf-viewer",
              __proto__: Plugin.prototype,
            },
          ];

          const pluginArray = {
            length: plugins.length,
            item(index) {
              return this[index];
            },
            namedItem(name) {
              return plugins.find((p) => p.name === name) || null;
            },
            refresh: () => {},
            [Symbol.iterator]: function* () {
              for (let i = 0; i < plugins.length; i++) yield this[i];
            },
            __proto__: PluginArray.prototype,
          };
          plugins.forEach((p, i) => (pluginArray[i] = p));
          return pluginArray;
        };

        const makeMimeTypeArray = (plugin) => {
          const mimeTypes = [
            {
              type: "application/pdf",
              suffixes: "pdf",
              description: "PDF (Taşınabilir Belge Biçimi)",
              enabledPlugin: plugin,
              __proto__: MimeType.prototype,
            },
            {
              type: "text/pdf",
              suffixes: "pdf",
              description: "PDF (Taşınabilir Belge Biçimi)",
              enabledPlugin: plugin,
              __proto__: MimeType.prototype,
            },
          ];

          const mimeTypeArray = {
            length: mimeTypes.length,
            item(index) {
              return this[index];
            },
            namedItem(name) {
              return mimeTypes.find((m) => m.type === name) || null;
            },
            [Symbol.iterator]: function* () {
              for (let i = 0; i < mimeTypes.length; i++) yield this[i];
            },
            __proto__: MimeTypeArray.prototype,
          };
          mimeTypes.forEach((m, i) => (mimeTypeArray[i] = m));
          return mimeTypeArray;
        };

        const pluginArray = makePluginArray();
        const mimeTypeArray = makeMimeTypeArray(pluginArray[0]);

        // Proxy navigator'a plugins ve mimeTypes ekle
        desiredNavigator.plugins = pluginArray;
        desiredNavigator.mimeTypes = mimeTypeArray;
      })();

      // **DateTimeFormat sahtelemesi**
      Object.defineProperty(Intl.DateTimeFormat.prototype, "resolvedOptions", {
        value: function () {
          return {
            hourcycle: "h23",
            locale: "tr-TR",
            calendar: "gregory",
            numberingSystem: "latn",
            timeZone: "Europe/Istanbul",
            year: "numeric",
            month: "2-digit",
            day: "numeric",
          };
        },
      });
      // **WebGL Sahtelemesi**
      const spoofWebGL = (context) => {
        const proto = context.prototype;

        const fakeVendor = "Apple Inc.";
        const fakeRenderer = "Apple GPU";

        const originalGetParameter = proto.getParameter;
        proto.getParameter = function (param) {
          // UNMASKED_VENDOR_WEBGL = 37445
          if (param === 37445) return fakeVendor;
          // UNMASKED_RENDERER_WEBGL = 37446
          if (param === 37446) return fakeRenderer;
          return originalGetParameter.call(this, param);
        };
      };

      if (window.WebGLRenderingContext) spoofWebGL(WebGLRenderingContext);
      if (window.WebGL2RenderingContext) spoofWebGL(WebGL2RenderingContext);

      const originalNaturalWidth = Object.getOwnPropertyDescriptor(
        HTMLImageElement.prototype,
        "naturalWidth"
      );
      const originalNaturalHeight = Object.getOwnPropertyDescriptor(
        HTMLImageElement.prototype,
        "naturalHeight"
      );

      Object.defineProperty(HTMLImageElement.prototype, "naturalWidth", {
        get() {
          // Yüklenememişse => 0 döner, sahtele
          if (this.complete && originalNaturalWidth.get.call(this) === 0) {
            return 20;
          }
          return originalNaturalWidth.get.call(this);
        },
      });

      Object.defineProperty(HTMLImageElement.prototype, "naturalHeight", {
        get() {
          if (this.complete && originalNaturalHeight.get.call(this) === 0) {
            return 20;
          }
          return originalNaturalHeight.get.call(this);
        },
      });

      // Worker içindeki WebGL sahteciliği için override
      const originalWorker = window.Worker;
      window.Worker = new Proxy(Worker, {
        construct(Target, args) {
          const workerScript = `
      const spoofWebGLInWorker = (context) => {
        const proto = context.prototype;
        const originalGetParameter = proto.getParameter;
        proto.getParameter = function(param) {
          if (param === 37445) return "Apple Inc."; // UNMASKED_VENDOR_WEBGL
          if (param === 37446) return "Apple GPU";  // UNMASKED_RENDERER_WEBGL
          return originalGetParameter.call(this, param);
        };
      };
      if (self.WebGLRenderingContext) spoofWebGLInWorker(WebGLRenderingContext);
      if (self.WebGL2RenderingContext) spoofWebGLInWorker(WebGL2RenderingContext);
      Object.defineProperty(self.navigator, 'platform', {
          get: () => "iPhone"
        });

        Object.defineProperty(self.navigator, 'hardwareConcurrency', {
          get: () => 4
        });

        Object.defineProperty(self.navigator, 'languages', {
          get: () => ["tr-TR"]
        });
    `;

          const fullScript = `
      ${workerScript}
      importScripts(${JSON.stringify(args[0])});
    `;

          const blob = new Blob([fullScript], {
            type: "application/javascript",
          });
          const blobURL = URL.createObjectURL(blob);
          return new Target(blobURL);
        },
      });

      (() => {
        const spoofedFonts = {
          // Grup: Standart fontlar
          default: 4244.143,
          serif: 4244.143,
          "sans-serif": 4268.149,
          Helvetica: 4268.149,
          monospace: 3760.15,
          Menlo: 3760.15,
          cursive: 3975.162,
          "Snell Roundhand": 3975.162,
          fantasy: 5813.433,
          Zapfino: 5813.433,
          "system-ui": 4380.153,
          "-apple-system": 4380.153,
          "Academy Engraved LET": 4430.152,
          "Al Nile": 4251.176,
          "American Typewriter": 4735.148,
          "Apple Color Emoji": 4315.17,
          AppleGothic: 4446.157,
          "Apple SD Gothic Neo": 4149.155,
          "Apple Symbols": 3289.118,
          Arial: 4283.144,
          "Arial Hebrew": 4283.137,
          "Arial Rounded MT Bold": 4492.149,
          Athelas: 4352.144,
          Avenir: 4312.175,
          "Avenir Black": 4312.175,
          "Avenir Black Oblique": 4312.175,
          "Avenir Book": 4312.175,
          "Avenir Heavy": 4312.175,
          "Avenir Light": 4312.175,
          "Avenir Medium": 4312.175,
          "Avenir Next": 4424.175,
          "Avenir Next Demi Bold": 4424.175,
          "Avenir Next Heavy": 4424.175,
          "Avenir Next Medium": 4424.175,
          "Avenir Next Ultra Light": 4424.175,
          "Avenir Next Condensed": 3649.175,
          "Avenir Next Condensed Demi Bold": 3649.175,
          "Avenir Next Condensed Heavy": 3649.175,
          "Avenir Next Condensed Medium": 3649.175,
          "Avenir Next Condensed Ultra Light": 3649.175,
          "Bangla Sangam MN": 4359.18,
          "Kohinoor Bangla": 4359.18,
          "Kohinoor Devanagari": 4359.18,
          Baskerville: 4292.147,
          "Bebas Neue": 3076.155,
          "Bodoni Ornaments": 5684.129,
          "Bradley Hand": 4569.161,
          Carlito: 4065.128,
          "Chalkboard SE": 4173.182,
          Chalkduster: 5151.163,
          Charter: 4364.157,
          "Charter Black": 4364.157,
          Cochin: 4303.147,
          Copperplate: 4187.13,
          Courier: 3749.129,
          "Courier 10 Pitch": 3749.129,
          Monaco: 3749.129,
          "Courier New": 3749.146,
          Damascus: 4251.129,
          Farah: 4251.129,
          "DB LCD Temp": 4492.129,
          "Devanagari Sangam MN": 4193.174,
          Didot: 4570.16,
          "DIN Alternate": 4272.15,
          "DIN Condensed": 3147.129,
          "Euphemia UCAS": 4197.17,
          Futura: 4234.167,
          Galvji: 4665.151,
          "Geeza Pro": 4244.158,
          Georgia: 4634.147,
          "Gill Sans": 4126.148,
          "Heiti SC": 4425.18,
          "Heiti TC": 4425.18,
          "Microsoft JhengHei": 4425.18,
          "PingFang HK": 4425.18,
          "PingFang SC": 4425.18,
          "PingFang TC": 4425.18,
          微软雅黑: 4425.18,
          "Helvetica Neue": 4318.15,
          "Hiragino Kaku Gothic Pro": 4680.129,
          "Hiragino Kaku Gothic ProN": 4680.129,
          "Hiragino Kaku Gothic ProN W3": 4680.129,
          "Hiragino Kaku Gothic ProN W6": 4680.129,
          "Hiragino Kaku Gothic Pro W3": 4680.129,
          "Hiragino Kaku Gothic Pro W6": 4680.129,
          "Hiragino Kaku Gothic Std": 5393.129,
          "Hiragino Kaku Gothic StdN": 5393.129,
          "Hiragino Kaku Gothic StdN W8": 5393.129,
          "Hiragino Kaku Gothic Std W8": 5393.129,
          "Hiragino Maru Gothic Pro": 4580.129,
          "Hiragino Maru Gothic ProN": 4580.129,
          "Hiragino Maru Gothic ProN W4": 4580.129,
          "Hiragino Maru Gothic Pro W4": 4580.129,
          "Hiragino Mincho Pro": 4676.129,
          "Hiragino Mincho ProN": 4676.129,
          "Hiragino Mincho ProN W3": 4676.129,
          "Hiragino Mincho ProN W6": 4676.129,
          "Hiragino Mincho Pro W3": 4676.129,
          "Hiragino Mincho Pro W6": 4676.129,
          "Hiragino Sans": 4889.129,
          "Hiragino Sans W3": 4889.129,
          "Hiragino Sans W5": 4889.129,
          "Hiragino Sans W6": 4889.129,
          "Hiragino Sans W7": 4889.129,
          "Hiragino Sans W8": 4889.129,
          "Hoefler Text": 4507.129,
          Impact: 3985.157,
          "Iowan Old Style": 4560.176,
          Kailasa: 4237.167,
          Kefa: 4367.149,
          "Khmer Sangam MN": 4015.232,
          "Kohinoor Gujarati": 4245.193,
          "Kohinoor Telugu": 4389.18,
          "Telugu Sangam MN": 4389.18,
          "Lao Sangam MN": 4170.17,
          LastResort: 7197.139,
          "Lucida Grande": 4842.156,
          Verdana: 4842.156,
          "Malayalam Sangam MN": 4115.152,
          Marion: 4281.129,
          "Marker Felt": 3979.14,
          Mishafi: 4251.186,
          "Mukta Mahee": 4139.214,
          "Myanmar Sangam MN": 4170.201,
          Noteworthy: 3602.205,
          "Noto Nastaliq Urdu": 4302.321,
          "Noto Sans Adlam": 4260.175,
          "Noto Sans Armenian": 4263.175,
          "Noto Sans Avestan": 4263.175,
          "Noto Sans Bamum": 4263.175,
          "Noto Sans Bassa Vah": 4263.175,
          "Noto Sans Buginese": 4263.175,
          "Noto Sans Buhid": 4263.175,
          "Noto Sans Canadian Aboriginal": 4263.175,
          "Noto Sans Coptic": 4263.175,
          "Noto Sans Cypriot": 4263.175,
          "Noto Sans Duployan": 4263.175,
          "Noto Sans Gothic": 4263.175,
          "Noto Sans Hanifi Rohingya": 4263.175,
          "Noto Sans Hanunoo": 4263.175,
          "Noto Sans Hatran": 4263.175,
          "Noto Sans Kayah Li": 4263.175,
          "Noto Sans Limbu": 4263.175,
          "Noto Sans Linear B": 4263.175,
          "Noto Sans Lisu": 4263.175,
          "Noto Sans Modi": 4263.175,
          "Noto Sans Mongolian": 4263.175,
          "Noto Sans Mro": 4263.175,
          "Noto Sans Multani": 4263.175,
          "Noto Sans Nabataean": 4263.175,
          "Noto Sans New Tai Lue": 4263.175,
          "Noto Sans NKo": 4263.175,
          "Noto Sans Ol Chiki": 4263.175,
          "Noto Sans Old Italic": 4263.175,
          "Noto Sans Old North Arabian": 4263.175,
          "Noto Sans Old Permic": 4263.175,
          "Noto Sans Old Persian": 4263.175,
          "Noto Sans Old Turkic": 4263.175,
          "Noto Sans Osage": 4263.175,
          "Noto Sans Pahawh Hmong": 4263.175,
          "Noto Sans Palmyrene": 4263.175,
          "Noto Sans Pau Cin Hau": 4263.175,
          "Noto Sans PhagsPa": 4263.175,
          "Noto Sans Rejang": 4263.175,
          "Noto Sans Saurashtra": 4263.175,
          "Noto Sans Sora Sompeng": 4263.175,
          "Noto Sans Syloti Nagri": 4263.175,
          "Noto Sans Tagalog": 4263.175,
          "Noto Sans Tagbanwa": 4263.175,
          "Noto Sans Tai Le": 4263.175,
          "Noto Sans Tai Viet": 4263.175,
          "Noto Sans Tifinagh": 4263.175,
          "Noto Sans Vai": 4263.175,
          "Noto Serif Hmong Nyiakeng": 4263.175,
          "Noto Serif Yezidi": 4263.175,
          "Noto Sans Batak": 4251.175,
          "Noto Sans Carian": 4251.175,
          "Noto Sans Glagolitic": 4251.175,
          "Noto Sans Imperial Aramaic": 4251.175,
          "Noto Sans Lycian": 4251.175,
          "Noto Sans Lydian": 4251.175,
          "Noto Sans Old South Arabian": 4251.175,
          "Noto Sans Osmanya": 4251.175,
          "Noto Sans Phoenician": 4251.175,
          "Noto Sans Samaritan": 4251.175,
          "Noto Sans Bhaiksuki": 4263.182,
          "Noto Sans Syriac": 4263.182,
          "Noto Sans Brahmi": 4263.177,
          "Noto Sans Caucasian Albanian": 4263.161,
          "Noto Sans Chakma": 4263.187,
          "Noto Sans Cham": 4263.188,
          "Noto Sans Cuneiform": 4263.294,
          "Noto Sans Egyptian Hieroglyphs": 4263.212,
          "Noto Sans Elbasan": 4263.144,
          "Noto Sans Gunjala Gondi": 4770.163,
          "Noto Sans Inscriptional Pahlavi": 4263.175,
          "Noto Sans Inscriptional Parthian": 4263.176,
          "Noto Sans Kharoshthi": 4263.176,
          "Noto Sans Javanese": 4263.262,
          "Noto Sans Kaithi": 4263.193,
          "Noto Sans Kannada": 4270.174,
          "Noto Sans Khojki": 4263.239,
          "Noto Sans Khudawadi": 4263.169,
          "Noto Sans Lepcha": 4263.195,
          "Noto Sans Linear A": 4271.175,
          "Noto Sans Mahajani": 4263.129,
          Symbol: 4263.129,
          "Noto Sans Mandaic": 4263.148,
          "Noto Sans Manichaean": 4263.146,
          "Noto Sans Marchen": 4263.211,
          "Noto Sans Masaram Gondi": 4263.175,
          "Noto Sans Meetei Mayek": 4263.175,
          "Noto Sans Mende Kikakui": 4263.163,
          "Noto Sans Takri": 4263.163,
          "Noto Sans Meroitic": 4263.175,
          "Noto Sans Miao": 4263.175,
          "Noto Sans Thaana": 4263.175,
          "Noto Sans Myanmar": 4263.281,
          "Noto Sans Zawgyi": 4263.281,
          "Noto Sans Newa": 4263.175,
          "Noto Sans Old Hungarian": 4263.133,
          "Noto Sans Oriya": 4270.18,
          "Noto Sans Psalter Pahlavi": 4263.175,
          "Noto Sans Sharada": 4263.178,
          "Noto Sans Siddham": 4263.26,
          "Noto Sans Sundanese": 4263.185,
          "Noto Sans Tai Tham": 4263.2,
          "Noto Sans Tirhuta": 4263.199,
          "Noto Sans Ugaritic": 4263.145,
          "Noto Sans Wancho": 4263.175,
          "Noto Sans Warang Citi": 4263.175,
          "Noto Sans Yi": 4243.175,
          "Noto Serif Ahom": 4263.213,
          "Noto Serif Balinese": 4263.23,
          Optima: 4336.153,
          Palatino: 4621.142,
          Papyrus: 3833.199,
          "Party LET": 2884.15,
          Rockwell: 4841.129,
          "Savoye LET": 3039.153,
          "Savoye LET Plain:1.0": 3039.153,
          "Savoye LET Plain CC.:1.0": 3039.153,
          Seravek: 4359.158,
          "Seravek ExtraLight": 4359.158,
          "Seravek Light": 4359.158,
          "Seravek Medium": 4359.158,
          SignPainter: 3095.116,
          "SignPainter-HouseScript": 3095.116,
          "Sinhala Sangam MN": 4093.173,
          STIXGeneral: 4175.195,
          "STIXGeneral-Regular": 4175.195,
          "STIXGeneral-Bold": 4415.195,
          "STIXGeneral-BoldItalic": 4163.193,
          "STIXGeneral-Italic": 3920.195,
          "STIX Two Math": 4425.129,
          "STIX Two Text": 4425.129,
          "Sukhumvit Set": 4071.203,
          Superclarendon: 5469.155,
          "Tamil Sangam MN": 4188.142,
          Thonburi: 4428.169,
          "Trebuchet MS": 4202.15,
          "Zapf Dingbats": 4251.128,
          Times: 4244.143, // default ve serif ile aynı grup
          "Times New Roman": 4244.143, // default ve serif ile aynı grup
          "System Font": 4380.153, // system-ui ve -apple-system ile aynı grup
        };

        const fakeFonts = new Set(Object.keys(spoofedFonts));

        const getFontName = (fontString) => {
          if (!fontString) return "";
          const cleaned = fontString.replace(/['"]/g, "").trim();
          const match = cleaned.match(/^[^,]+/);
          return match ? match[0].trim() : "";
        };

        const getSpoofedWidth = (fontName) => spoofedFonts[fontName] || null;

        // 1. document.fonts sahteleştirme
        const originalFonts = document.fonts;
        const fakeDocumentFonts = {
          check(font) {
            const fontName = getFontName(font);
            return fakeFonts.has(fontName);
          },
          forEach(callback) {
            fakeFonts.forEach((font) => {
              callback({
                family: font,
                status: "loaded",
                weight: "normal",
                style: "normal",
              });
            });
          },
          entries() {
            return Array.from(fakeFonts)
              .map((font) => [{ family: font }])
              [Symbol.iterator]();
          },
          keys() {
            return fakeFonts.values();
          },
          values() {
            return Array.from(fakeFonts)
              .map((font) => ({ family: font }))
              [Symbol.iterator]();
          },
          add() {},
          clear() {},
          delete() {},
          has(font) {
            const fontName = getFontName(font);
            return fakeFonts.has(fontName);
          },
          ready: Promise.resolve(),
          size: fakeFonts.size,
          [Symbol.iterator]() {
            return Array.from(fakeFonts)
              .map((font) => ({ family: font }))
              [Symbol.iterator]();
          },
          addEventListener() {},
          removeEventListener() {},
          dispatchEvent() {
            return true;
          },
        };

        Object.defineProperty(document, "fonts", {
          value: Object.create(
            originalFonts.__proto__ || FontFaceSet.prototype,
            {
              ...Object.getOwnPropertyDescriptors(fakeDocumentFonts),
              toString: { value: () => "[object FontFaceSet]" },
            }
          ),
          writable: false,
          configurable: true,
        });

        // 2. DOM tabanlı font tespitini engelleme (Sadece Pixelscan için)
        if (window.location.hostname.includes("demo")) {
        } else {
          const originalCreateElement = document.createElement;
          document.createElement = function (tagName) {
            const element = originalCreateElement.call(document, tagName);
            const originalStyleDescriptor = Object.getOwnPropertyDescriptor(
              HTMLElement.prototype,
              "style"
            );
            const originalStyleGetter = originalStyleDescriptor.get;
            const originalStyleSetter = originalStyleDescriptor.set;

            Object.defineProperty(element, "style", {
              get() {
                const style = originalStyleGetter.call(this);
                const proxy = new Proxy(style, {
                  get(target, prop) {
                    if (prop === "fontFamily") {
                      const originalFontFamily = target.fontFamily || "";
                      const fontList = originalFontFamily
                        .split(",")
                        .map((font) => font.replace(/['"]/g, "").trim())
                        .filter((font) => fakeFonts.has(font))
                        .join(", ");
                      return fontList || "Times";
                    }
                    if (
                      prop === "getPropertyValue" &&
                      typeof target.getPropertyValue === "function"
                    ) {
                      return (property) => {
                        if (property === "font-family") {
                          const originalFontFamily = target.fontFamily || "";
                          const fontList = originalFontFamily
                            .split(",")
                            .map((font) => font.replace(/['"]/g, "").trim())
                            .filter((font) => fakeFonts.has(font))
                            .join(", ");
                          return fontList || "Times";
                        }
                        return target.getPropertyValue(property);
                      };
                    }
                    return Reflect.get(target, prop);
                  },
                  set(target, prop, value) {
                    if (prop === "fontFamily") {
                      const fontList = value
                        .split(",")
                        .map((font) => font.replace(/['"]/g, "").trim())
                        .filter((font) => fakeFonts.has(font))
                        .join(", ");
                      return Reflect.set(target, prop, fontList || "Times");
                    }
                    return Reflect.set(target, prop, value);
                  },
                  has(target, prop) {
                    return prop in target;
                  },
                  ownKeys(target) {
                    return Reflect.ownKeys(target);
                  },
                  getOwnPropertyDescriptor(target, prop) {
                    return Reflect.getOwnPropertyDescriptor(target, prop);
                  },
                });

                Object.setPrototypeOf(proxy, Object.getPrototypeOf(style));
                return proxy;
              },
              set(value) {
                originalStyleSetter.call(this, value);
              },
            });
            return element;
          };
        }

        // 3. window.getComputedStyle sahteleştirme
        const originalGetComputedStyle = window.getComputedStyle;
        window.getComputedStyle = function (element, pseudoElement) {
          const style = originalGetComputedStyle.call(
            window,
            element,
            pseudoElement
          );
          if (!style) return style;

          const originalFontFamily = style.fontFamily || "";
          const fontList = originalFontFamily
            .split(",")
            .map((font) => font.replace(/['"]/g, "").trim())
            .filter((font) => fakeFonts.has(font))
            .join(", ");

          const spoofedStyle = new Proxy(style, {
            get(target, prop) {
              if (prop === "fontFamily") {
                return fontList || "Times";
              }
              if (
                prop === "getPropertyValue" &&
                typeof target.getPropertyValue === "function"
              ) {
                return (property) => {
                  if (property === "font-family") {
                    return fontList || "Times";
                  }
                  return target.getPropertyValue(property);
                };
              }
              return Reflect.get(target, prop);
            },
          });
          return spoofedStyle;
        };

        // 4. Canvas measureText sahteleştirme
        const realMeasureText = CanvasRenderingContext2D.prototype.measureText;
        CanvasRenderingContext2D.prototype.measureText = function (text) {
          const name = getFontName(this.font);
          const spoofed = getSpoofedWidth(name);
          if (spoofed) {
            const scale = text.length / "mmmmmmmmmmlli".length;
            return {
              width: spoofed * scale,
              actualBoundingBoxLeft: -spoofed * scale * 0.1,
              actualBoundingBoxRight: spoofed * scale * 0.9,
              actualBoundingBoxAscent: 10,
              actualBoundingBoxDescent: 2,
              fontBoundingBoxAscent: 12,
              fontBoundingBoxDescent: 3,
            };
          }
          this.font = this.font.replace(name, "Times");
          return realMeasureText.call(this, text);
        };

        // 5. Canvas font sahteleştirme
        const originalFontDescriptor = Object.getOwnPropertyDescriptor(
          CanvasRenderingContext2D.prototype,
          "font"
        );
        const originalSetFont = originalFontDescriptor.set;
        const originalGetFont = originalFontDescriptor.get;
        Object.defineProperty(CanvasRenderingContext2D.prototype, "font", {
          set(value) {
            const fontName = getFontName(value);
            if (!fakeFonts.has(fontName)) {
              value = value.replace(fontName, "Times");
            }
            originalSetFont.call(this, value);
          },
          get() {
            const value = originalGetFont.call(this);
            const fontName = getFontName(value);
            if (!fakeFonts.has(fontName)) {
              return value.replace(fontName, "Times");
            }
            return value;
          },
        });

        // 6. getBoundingClientRect sahteleştirme
        const realGetBoundingClientRect =
          HTMLElement.prototype.getBoundingClientRect;
        HTMLElement.prototype.getBoundingClientRect = function () {
          const style = window.getComputedStyle(this);
          const name = getFontName(
            style.fontFamily || this.getAttribute("font-family") || ""
          );
          const spoofed = getSpoofedWidth(name);
          if (spoofed) {
            return {
              width: spoofed,
              height: 20,
              top: 0,
              left: 0,
              right: spoofed,
              bottom: 20,
              x: 0,
              y: 0,
              toJSON: () => "{}",
            };
          }
          return realGetBoundingClientRect.call(this);
        };

        // 7. offsetWidth sahteleştirme
        const originalOffsetWidthDescriptor = Object.getOwnPropertyDescriptor(
          HTMLElement.prototype,
          "offsetWidth"
        );
        const originalOffsetWidth = originalOffsetWidthDescriptor.get;
        Object.defineProperty(HTMLElement.prototype, "offsetWidth", {
          get() {
            const style = window.getComputedStyle(this);
            const name = getFontName(style.fontFamily || "");
            const spoofed = getSpoofedWidth(name);
            if (spoofed) {
              return spoofed;
            }
            return originalOffsetWidth.call(this);
          },
          configurable: true,
        });

        // 8. clientWidth sahteleştirme
        const originalClientWidthDescriptor = Object.getOwnPropertyDescriptor(
          HTMLElement.prototype,
          "clientWidth"
        );
        const originalClientWidth = originalClientWidthDescriptor.get;
        Object.defineProperty(HTMLElement.prototype, "clientWidth", {
          get() {
            const style = window.getComputedStyle(this);
            const name = getFontName(style.fontFamily || "");
            const spoofed = getSpoofedWidth(name);
            if (spoofed) {
              return spoofed;
            }
            return originalClientWidth.call(this);
          },
          configurable: true,
        });

        // 9. FontFace constructor sahteleştirme
        const OriginalFontFace = window.FontFace;
        window.FontFace = function (family, source, descriptors) {
          if (!fakeFonts.has(family)) {
            throw new Error("Font not supported");
          }
          return new OriginalFontFace(family, source, descriptors);
        };
        window.FontFace.prototype = OriginalFontFace.prototype;

        // Native-like toString'ler
        [
          window.getComputedStyle,
          CanvasRenderingContext2D.prototype.measureText,
          CanvasRenderingContext2D.prototype.font,
          HTMLElement.prototype.getBoundingClientRect,
          HTMLElement.prototype.offsetWidth,
          HTMLElement.prototype.clientWidth,
          window.FontFace,
          document.createElement,
        ].forEach((fn) => {
          Object.defineProperty(fn, "toString", {
            value: () => "function () { [native code] }",
          });
        });
      })();
    });

    const client = await page.context().newCDPSession(page);
    await client.send("Network.setExtraHTTPHeaders", {
      headers: {
        // Burada "Sec-Fetch-Site" başlığını "none" olarak ekliyoruz.
        "Sec-Fetch-Site": "none",
      },
    });

    // Sayfaya git
    const targetUrl = "https://bot.sannysoft.com/";
    await page.goto(targetUrl, {
      waitUntil: "networkidle",
    });

    // Bilgileri kontrol et
    const navigatorInfo = await page.evaluate(() => {
      const props = {};
      for (const key in navigator) {
        props[key] = navigator[key];
      }
      return {
        ...props,
        width: screen.width,
        height: screen.height,
        availWidth: screen.availWidth,
        availHeight: screen.availHeight,
        colorDepth: screen.colorDepth,
        pixelDepth: screen.pixelDepth,
        availTop: screen.availTop,
        availLeft: screen.availLeft,
        orientationType: screen.orientation?.type,
        orientationAngle: screen.orientation?.angle,
        devicePixelRatio: window.devicePixelRatio,
        innerWidth: window.innerWidth,
        innerHeight: window.innerHeight,
        outerWidth: window.outerWidth,
        outerHeight: window.outerHeight,
        dateFormat: new Intl.DateTimeFormat("tr-TR").format(new Date()),
      };
    });

    // 5 dakika bekle
    await page.waitForTimeout(300000000);

    console.log("Closing the browser......");
    await browser.close();
    console.log("The browser was closed successfully.");
  } catch (error) {
    console.error("An error occurred:", error);
    if (browser) {
      console.log("Closing the browser after the error...");
      await browser.close();
    }
  }
})();

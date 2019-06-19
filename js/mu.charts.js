
var MuChartsConfig = {
  "options": {
    "tooltip": {},
    "legend": [
      {
        "top": 0,
        "left": 15,
        "data": [
          "Oracle Cloud Infrastructure",
          "Oracle Edge Services",
          "Oracle Container Engine"
        ]
      }
    ],
    "animationDuration": 1500,
    "animationEasingUpdate": "quinticInOut",
    "textStyle": {
      "fontFamily": "Roboto, sans-serif"
    },
    "series": [
      {
        "data": [
          {
            "name": "Bucket",
            "type": {
              "name": "Object Storage",
              "icon": "images/tech/bucket.svg",
              "id": 1
            },
            "tech": {
              "name": "Oracle Cloud Infrastructure",
              "icon": "images/tech/oci.png",
              "color": "#f80000",
              "id": 0
            },
            "id": 0,
            "x": 200,
            "y": 0,
            "category": 0,
            "symbol": "image://images/tech/bucket.svg",
            "symbolSize": 40
          },
          {
            "name": "ATP Database",
            "type": {
              "name": "Oracle ATP",
              "icon": "images/tech/atp.svg",
              "scale": 2,
              "id": 0
            },
            "tech": {
              "name": "Oracle Cloud Infrastructure",
              "icon": "images/tech/oci.png",
              "color": "#f80000",
              "id": 0
            },
            "id": 1,
            "x": 250,
            "y": 0,
            "label": {
              "offset": [
                0,
                -20
              ]
            },
            "category": 0,
            "symbol": "image://images/tech/atp.svg",
            "symbolSize": 80
          },
          {
            "name": "OCI Stream",
            "type": {
              "name": "Streaming",
              "icon": "images/tech/streaming.svg",
              "id": 2
            },
            "tech": {
              "name": "Oracle Cloud Infrastructure",
              "icon": "images/tech/oci.png",
              "color": "#f80000",
              "id": 0
            },
            "id": 2,
            "x": 300,
            "y": 0,
            "label": {
              "offset": [
                0,
                5
              ]
            },
            "category": 0,
            "symbol": "image://images/tech/streaming.svg",
            "symbolSize": 40
          },
          {
            "name": "DNS",
            "type": {
              "name": "DNS",
              "icon": "images/tech/dns.svg",
              "id": 5
            },
            "tech": {
              "name": "Oracle Edge Services",
              "icon": "images/tech/cdn.svg",
              "color": "#5F5F5F",
              "id": 1
            },
            "id": 3,
            "x": 50,
            "y": 2.5,
            "category": 1,
            "symbol": "image://images/tech/dns.svg",
            "symbolSize": 40
          },
          {
            "name": "WAF",
            "type": {
              "name": "Web Application Firewall",
              "icon": "images/tech/waf.svg",
              "id": 6
            },
            "tech": {
              "name": "Oracle Edge Services",
              "icon": "images/tech/cdn.svg",
              "color": "#5F5F5F",
              "id": 1
            },
            "id": 4,
            "x": 100,
            "y": 2.5,
            "category": 1,
            "symbol": "image://images/tech/waf.svg",
            "symbolSize": 40
          },
          {
            "name": "Ingress",
            "type": {
              "name": "Nginx",
              "icon": "images/tech/nginx.png",
              "id": 12
            },
            "tech": {
              "name": "Oracle Container Engine",
              "icon": "images/tech/k8s.png",
              "color": "#00758f",
              "id": 2
            },
            "id": 5,
            "x": 100,
            "y": 50,
            "category": 2,
            "symbol": "image://images/tech/nginx.png",
            "symbolSize": 40
          },
          {
            "name": "Storefront UI",
            "type": {
              "name": "Nginx",
              "icon": "images/tech/nginx.png",
              "id": 12
            },
            "tech": {
              "name": "Oracle Container Engine",
              "icon": "images/tech/k8s.png",
              "color": "#00758f",
              "id": 2
            },
            "id": 6,
            "x": 50,
            "y": 100,
            "category": 2,
            "symbol": "image://images/tech/nginx.png",
            "symbolSize": 40
          },
          {
            "name": "REST API",
            "type": {
              "name": "Node.js",
              "icon": "images/tech/nodejs.png",
              "id": 8
            },
            "tech": {
              "name": "Oracle Container Engine",
              "icon": "images/tech/k8s.png",
              "color": "#00758f",
              "id": 2
            },
            "id": 7,
            "x": 150,
            "y": 100,
            "category": 2,
            "symbol": "image://images/tech/nodejs.png",
            "symbolSize": 40
          },
          {
            "name": "Session DB",
            "type": {
              "name": "Redis",
              "icon": "images/tech/redis.png",
              "id": 9
            },
            "tech": {
              "name": "Oracle Container Engine",
              "icon": "images/tech/k8s.png",
              "color": "#00758f",
              "id": 2
            },
            "id": 8,
            "x": 200,
            "y": 150,
            "category": 2,
            "symbol": "image://images/tech/redis.png",
            "symbolSize": 40
          },
          {
            "name": "Catalog",
            "type": {
              "name": "Go",
              "icon": "images/tech/go.svg",
              "id": 10
            },
            "tech": {
              "name": "Oracle Container Engine",
              "icon": "images/tech/k8s.png",
              "color": "#00758f",
              "id": 2
            },
            "id": 9,
            "x": 300,
            "y": 50,
            "category": 2,
            "symbol": "image://images/tech/go.svg",
            "symbolSize": 40
          },
          {
            "name": "Carts",
            "type": {
              "name": "Java",
              "icon": "images/tech/java.png",
              "scale": 1.5,
              "id": 7
            },
            "tech": {
              "name": "Oracle Container Engine",
              "icon": "images/tech/k8s.png",
              "color": "#00758f",
              "id": 2
            },
            "id": 10,
            "x": 350,
            "y": 100,
            "category": 2,
            "symbol": "image://images/tech/java.png",
            "symbolSize": 60
          },
          {
            "name": "Orders",
            "type": {
              "name": "Java",
              "icon": "images/tech/java.png",
              "scale": 1.5,
              "id": 7
            },
            "tech": {
              "name": "Oracle Container Engine",
              "icon": "images/tech/k8s.png",
              "color": "#00758f",
              "id": 2
            },
            "id": 11,
            "x": 300,
            "y": 100,
            "category": 2,
            "symbol": "image://images/tech/java.png",
            "symbolSize": 60
          },
          {
            "name": "Shipping",
            "type": {
              "name": "Java",
              "icon": "images/tech/java.png",
              "scale": 1.5,
              "id": 7
            },
            "tech": {
              "name": "Oracle Container Engine",
              "icon": "images/tech/k8s.png",
              "color": "#00758f",
              "id": 2
            },
            "id": 12,
            "x": 350,
            "y": 50,
            "category": 2,
            "symbol": "image://images/tech/java.png",
            "symbolSize": 60
          },
          {
            "name": "Stream Consumer",
            "type": {
              "name": "Java",
              "icon": "images/tech/java.png",
              "scale": 1.5,
              "id": 7
            },
            "tech": {
              "name": "Oracle Container Engine",
              "icon": "images/tech/k8s.png",
              "color": "#00758f",
              "id": 2
            },
            "id": 13,
            "x": 400,
            "y": 100,
            "category": 2,
            "symbol": "image://images/tech/java.png",
            "symbolSize": 60
          },
          {
            "name": "Payment",
            "type": {
              "name": "Go",
              "icon": "images/tech/go.svg",
              "id": 10
            },
            "tech": {
              "name": "Oracle Container Engine",
              "icon": "images/tech/k8s.png",
              "color": "#00758f",
              "id": 2
            },
            "id": 14,
            "x": 400,
            "y": 50,
            "category": 2,
            "symbol": "image://images/tech/go.svg",
            "symbolSize": 40
          },
          {
            "name": "Users",
            "type": {
              "name": "Go",
              "icon": "images/tech/go.svg",
              "id": 10
            },
            "tech": {
              "name": "Oracle Container Engine",
              "icon": "images/tech/k8s.png",
              "color": "#00758f",
              "id": 2
            },
            "id": 15,
            "x": 200,
            "y": 100,
            "category": 2,
            "symbol": "image://images/tech/go.svg",
            "symbolSize": 40
          },
          {
            "name": "Users NoSQL",
            "type": {
              "name": "MongoDB",
              "icon": "images/tech/mongo.png",
              "scale": 1.2,
              "id": 13
            },
            "tech": {
              "name": "Oracle Container Engine",
              "icon": "images/tech/k8s.png",
              "color": "#00758f",
              "id": 2
            },
            "id": 16,
            "x": 250,
            "y": 150,
            "category": 2,
            "symbol": "image://images/tech/mongo.png",
            "symbolSize": 48
          }
        ],
        "links": [
          {
            "source": 3,
            "target": 4
          },
          {
            "source": 3,
            "target": 5,
            "lineStyle": {
              "type": "dotted"
            }
          },
          {
            "source": 4,
            "target": 5
          },
          {
            "source": 5,
            "target": 6
          },
          {
            "source": 5,
            "target": 7
          },
          {
            "source": 7,
            "target": 8
          },
          {
            "source": 7,
            "target": 10
          },
          {
            "source": 7,
            "target": 9
          },
          {
            "source": 7,
            "target": 15
          },
          {
            "source": 7,
            "target": 11
          },
          {
            "source": 15,
            "target": 16
          },
          {
            "source": 9,
            "target": 1
          },
          {
            "source": 9,
            "target": 0
          },
          {
            "source": 10,
            "target": 1
          },
          {
            "source": 11,
            "target": 1
          },
          {
            "source": 11,
            "target": 15
          },
          {
            "source": 11,
            "target": 10
          },
          {
            "source": 11,
            "target": 12
          },
          {
            "source": 11,
            "target": 14
          },
          {
            "source": 12,
            "target": 2
          },
          {
            "source": 2,
            "target": 13
          }
        ],
        "categories": [
          {
            "name": "Oracle Cloud Infrastructure",
            "icon": "images/tech/oci.png",
            "color": "#f80000",
            "id": 0,
            "itemStyle": {
              "color": "#f80000"
            }
          },
          {
            "name": "Oracle Edge Services",
            "icon": "images/tech/cdn.svg",
            "color": "#5F5F5F",
            "id": 1,
            "itemStyle": {
              "color": "#5F5F5F"
            }
          },
          {
            "name": "Oracle Container Engine",
            "icon": "images/tech/k8s.png",
            "color": "#00758f",
            "id": 2,
            "itemStyle": {
              "color": "#00758f"
            }
          }
        ],
        "type": "graph",
        "layout": "none",
        "top": 50,
        "roam": false,
        "focusNodeAdjacency": true,
        "itemStyle": {
          "normal": {
            "borderColor": "#ddd",
            "borderWidth": 1,
            "shadowColor": "rgba(0, 0, 0, 0.2)"
          }
        },
        "symbolKeepAspect": true,
        "edgeSymbol": [
          "none",
          "arrow"
        ],
        "edgeSymbolSize": [
          5,
          8
        ],
        "label": {
          "show": true,
          "fontSize": 16,
          "color": "#333",
          "backgroundColor": "#fff",
          "position": "bottom",
          "formatter": "{b}"
        },
        "lineStyle": {
          "color": "source",
          "opacity": 0.3,
          "curveness": 0.35
        },
        "emphasis": {
          "lineStyle": {
            "opacity": 1,
            "width": 4
          }
        }
      }
    ]
  }
};
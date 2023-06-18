import express, { Request, Response } from 'express';
import { podController } from '../controllers/podController';

const podRouter = express.Router();

podRouter.get('/', podController.getPods, (_req: Request, res: Response) => {
    console.log('INSIDE POD ROUTER');
    res.status(200).json(res.locals.pods);
})

podRouter.post('/', (req: Request, res: Response) => {
    console.log('Post request to podRouter and req.body', req.body);
    const response = {
        "matches": [
         {
          "vulnerability": {
           "id": "Chicken",
           "dataSource": "https://nvd.nist.gov/vuln/detail/CVE-2022-28391",
           "namespace": "nvd:cpe",
           "severity": "Negligible",
           "urls": [
            "https://git.alpinelinux.org/aports/plain/main/busybox/0001-libbb-sockaddr2str-ensure-only-printable-characters-.patch",
            "https://git.alpinelinux.org/aports/plain/main/busybox/0002-nslookup-sanitize-all-printed-strings-with-printable.patch",
            "https://gitlab.alpinelinux.org/alpine/aports/-/issues/13661"
           ],
           "description": "BusyBox through 1.35.0 allows remote attackers to execute arbitrary code if netstat is used to print a DNS PTR record's value to a VT compatible terminal. Alternatively, the attacker could choose to change the terminal's colors.",
           "cvss": [
            {
             "source": "nvd@nist.gov",
             "type": "Primary",
             "version": "2.0",
             "vector": "AV:N/AC:M/Au:N/C:P/I:P/A:P",
             "metrics": {
              "baseScore": 6.8,
              "exploitabilityScore": 8.6,
              "impactScore": 6.4
             },
             "vendorMetadata": {}
            },
            {
             "source": "nvd@nist.gov",
             "type": "Primary",
             "version": "3.1",
             "vector": "CVSS:3.1/AV:N/AC:L/PR:N/UI:R/S:U/C:H/I:H/A:H",
             "metrics": {
              "baseScore": 8.8,
              "exploitabilityScore": 2.8,
              "impactScore": 5.9
             },
             "vendorMetadata": {}
            }
           ],
           "fix": {
            "versions": [],
            "state": "unknown"
           },
           "advisories": []
          },
          "relatedVulnerabilities": [],
          "matchDetails": [
           {
            "type": "cpe-match",
            "matcher": "stock-matcher",
            "searchedBy": {
             "namespace": "nvd:cpe",
             "cpes": [
              "cpe:2.3:a:busybox:busybox:1.34.1:*:*:*:*:*:*:*"
             ]
            },
            "found": {
             "vulnerabilityID": "CVE-2022-28391",
             "versionConstraint": "<= 1.35.0 (unknown)",
             "cpes": [
              "cpe:2.3:a:busybox:busybox:*:*:*:*:*:*:*:*"
             ]
            }
           }
          ],
          "artifact": {
           "id": "7e7f175e7d1ab63a",
           "name": "busybox",
           "version": "1.34.1",
           "type": "binary",
           "locations": [
            {
             "path": "/bin/[",
             "layerID": "sha256:ccc85b40696f6f8b1c8be7f930dd911eaa195a8964638a665b754b4be79c15b0"
            }
           ],
           "language": "",
           "licenses": [],
           "cpes": [
            "cpe:2.3:a:busybox:busybox:1.34.1:*:*:*:*:*:*:*",
            "cpe:2.3:a:busybox:busybox:1.34.1:*:*:*:*:*:*:*"
           ],
           "purl": "",
           "upstreams": []
          }
         },
         {
          "vulnerability": {
           "id": "GHSA-vvpx-j8f3-3w6h",
           "dataSource": "https://github.com/advisories/GHSA-vvpx-j8f3-3w6h",
           "namespace": "github:language:go",
           "severity": "High",
           "urls": [
            "https://github.com/advisories/GHSA-vvpx-j8f3-3w6h"
           ],
           "description": "Uncontrolled Resource Consumption",
           "cvss": [
            {
             "version": "3.1",
             "vector": "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:N/I:N/A:H",
             "metrics": {
              "baseScore": 7.5,
              "exploitabilityScore": 3.9,
              "impactScore": 3.6
             },
             "vendorMetadata": {
              "base_severity": "High",
              "status": "N/A"
             }
            }
           ],
           "fix": {
            "versions": [
             "0.7.0"
            ],
            "state": "fixed"
           },
           "advisories": []
          },
          "relatedVulnerabilities": [
           {
            "id": "CVE-2022-41723",
            "dataSource": "https://nvd.nist.gov/vuln/detail/CVE-2022-41723",
            "namespace": "nvd:cpe",
            "severity": "High",
            "urls": [
             "https://go.dev/cl/468135",
             "https://go.dev/cl/468295",
             "https://go.dev/issue/57855",
             "https://groups.google.com/g/golang-announce/c/V0aBFqaFs_E",
             "https://lists.fedoraproject.org/archives/list/package-announce@lists.fedoraproject.org/message/4MA5XS5DAOJ5PKKNG5TUXKPQOFHT5VBC/",
             "https://lists.fedoraproject.org/archives/list/package-announce@lists.fedoraproject.org/message/RGW7GE2Z32ZT47UFAQFDRQE33B7Q7LMT/",
             "https://lists.fedoraproject.org/archives/list/package-announce@lists.fedoraproject.org/message/RLBQ3A7ROLEQXQLXFDLNJ7MYPKG5GULE/",
             "https://lists.fedoraproject.org/archives/list/package-announce@lists.fedoraproject.org/message/XX3IMUTZKRQ73PBZM4E2JP4BKYH4C6XE/",
             "https://pkg.go.dev/vuln/GO-2023-1571"
            ],
            "description": "A maliciously crafted HTTP/2 stream could cause excessive CPU consumption in the HPACK decoder, sufficient to cause a denial of service from a small number of small requests.",
            "cvss": [
             {
              "source": "nvd@nist.gov",
              "type": "Primary",
              "version": "3.1",
              "vector": "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:N/I:N/A:H",
              "metrics": {
               "baseScore": 7.5,
               "exploitabilityScore": 3.9,
               "impactScore": 3.6
              },
              "vendorMetadata": {}
             }
            ]
           }
          ],
          "matchDetails": [
           {
            "type": "exact-direct-match",
            "matcher": "go-module-matcher",
            "searchedBy": {
             "language": "go",
             "namespace": "github:language:go"
            },
            "found": {
             "versionConstraint": "<0.7.0 (unknown)",
             "vulnerabilityID": "GHSA-vvpx-j8f3-3w6h"
            }
           }
          ],
          "artifact": {
           "id": "cf2f86c828e14c41",
           "name": "golang.org/x/net",
           "version": "v0.4.0",
           "type": "go-module",
           "locations": [
            {
             "path": "/bin/alertmanager",
             "layerID": "sha256:381de408a68bc2c64d2a6fe4b6fbd8c78e3009d5e6e78d7e255a2a6912164c64"
            }
           ],
           "language": "go",
           "licenses": [],
           "cpes": [
            "cpe:2.3:a:golang:x/net:v0.4.0:*:*:*:*:*:*:*"
           ],
           "purl": "pkg:golang/golang.org/x/net@v0.4.0",
           "upstreams": [],
           "metadataType": "GolangBinMetadata",
           "metadata": {
            "goCompiledVersion": "go1.19.4",
            "architecture": "amd64",
            "h1Digest": "h1:Q5QPcMlvfxFTAPV0+07Xz/MpK9NTXu2VDUuy0FeMfaU=",
            "mainModule": "github.com/prometheus/alertmanager"
           }
          }
         },
         {
          "vulnerability": {
           "id": "GHSA-vvpx-j8f3-3w6h",
           "dataSource": "https://github.com/advisories/GHSA-vvpx-j8f3-3w6h",
           "namespace": "github:language:go",
           "severity": "Low",
           "urls": [
            "https://github.com/advisories/GHSA-vvpx-j8f3-3w6h"
           ],
           "description": "Uncontrolled Resource Consumption",
           "cvss": [
            {
             "version": "3.1",
             "vector": "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:N/I:N/A:H",
             "metrics": {
              "baseScore": 7.5,
              "exploitabilityScore": 3.9,
              "impactScore": 3.6
             },
             "vendorMetadata": {
              "base_severity": "High",
              "status": "N/A"
             }
            }
           ],
           "fix": {
            "versions": [
             "0.7.0"
            ],
            "state": "fixed"
           },
           "advisories": []
          },
          "relatedVulnerabilities": [
           {
            "id": "CVE-2022-41723",
            "dataSource": "https://nvd.nist.gov/vuln/detail/CVE-2022-41723",
            "namespace": "nvd:cpe",
            "severity": "High",
            "urls": [
             "https://go.dev/cl/468135",
             "https://go.dev/cl/468295",
             "https://go.dev/issue/57855",
             "https://groups.google.com/g/golang-announce/c/V0aBFqaFs_E",
             "https://lists.fedoraproject.org/archives/list/package-announce@lists.fedoraproject.org/message/4MA5XS5DAOJ5PKKNG5TUXKPQOFHT5VBC/",
             "https://lists.fedoraproject.org/archives/list/package-announce@lists.fedoraproject.org/message/RGW7GE2Z32ZT47UFAQFDRQE33B7Q7LMT/",
             "https://lists.fedoraproject.org/archives/list/package-announce@lists.fedoraproject.org/message/RLBQ3A7ROLEQXQLXFDLNJ7MYPKG5GULE/",
             "https://lists.fedoraproject.org/archives/list/package-announce@lists.fedoraproject.org/message/XX3IMUTZKRQ73PBZM4E2JP4BKYH4C6XE/",
             "https://pkg.go.dev/vuln/GO-2023-1571"
            ],
            "description": "A maliciously crafted HTTP/2 stream could cause excessive CPU consumption in the HPACK decoder, sufficient to cause a denial of service from a small number of small requests.",
            "cvss": [
             {
              "source": "nvd@nist.gov",
              "type": "Primary",
              "version": "3.1",
              "vector": "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:N/I:N/A:H",
              "metrics": {
               "baseScore": 7.5,
               "exploitabilityScore": 3.9,
               "impactScore": 3.6
              },
              "vendorMetadata": {}
             }
            ]
           }
          ],
          "matchDetails": [
           {
            "type": "exact-direct-match",
            "matcher": "go-module-matcher",
            "searchedBy": {
             "language": "go",
             "namespace": "github:language:go"
            },
            "found": {
             "versionConstraint": "<0.7.0 (unknown)",
             "vulnerabilityID": "GHSA-vvpx-j8f3-3w6h"
            }
           }
          ],
          "artifact": {
           "id": "acf66e545a09316e",
           "name": "golang.org/x/net",
           "version": "v0.4.0",
           "type": "go-module",
           "locations": [
            {
             "path": "/bin/amtool",
             "layerID": "sha256:5f1e726ad5f3c498d839619a5b52f99f3726f058cd045371b39c3cfba2865bad"
            }
           ],
           "language": "go",
           "licenses": [],
           "cpes": [
            "cpe:2.3:a:golang:x/net:v0.4.0:*:*:*:*:*:*:*"
           ],
           "purl": "pkg:golang/golang.org/x/net@v0.4.0",
           "upstreams": [],
           "metadataType": "GolangBinMetadata",
           "metadata": {
            "goCompiledVersion": "go1.19.4",
            "architecture": "amd64",
            "h1Digest": "h1:Q5QPcMlvfxFTAPV0+07Xz/MpK9NTXu2VDUuy0FeMfaU=",
            "mainModule": "github.com/prometheus/alertmanager"
           }
          }
         },
         {
            "vulnerability": {
             "id": "Chicken",
             "dataSource": "https://nvd.nist.gov/vuln/detail/CVE-2022-28391",
             "namespace": "nvd:cpe",
             "severity": "Critical",
             "urls": [
              "https://git.alpinelinux.org/aports/plain/main/busybox/0001-libbb-sockaddr2str-ensure-only-printable-characters-.patch",
              "https://git.alpinelinux.org/aports/plain/main/busybox/0002-nslookup-sanitize-all-printed-strings-with-printable.patch",
              "https://gitlab.alpinelinux.org/alpine/aports/-/issues/13661"
             ],
             "description": "BusyBox through 1.35.0 allows remote attackers to execute arbitrary code if netstat is used to print a DNS PTR record's value to a VT compatible terminal. Alternatively, the attacker could choose to change the terminal's colors.",
             "cvss": [
              {
               "source": "nvd@nist.gov",
               "type": "Primary",
               "version": "2.0",
               "vector": "AV:N/AC:M/Au:N/C:P/I:P/A:P",
               "metrics": {
                "baseScore": 6.8,
                "exploitabilityScore": 8.6,
                "impactScore": 6.4
               },
               "vendorMetadata": {}
              },
              {
               "source": "nvd@nist.gov",
               "type": "Primary",
               "version": "3.1",
               "vector": "CVSS:3.1/AV:N/AC:L/PR:N/UI:R/S:U/C:H/I:H/A:H",
               "metrics": {
                "baseScore": 8.8,
                "exploitabilityScore": 2.8,
                "impactScore": 5.9
               },
               "vendorMetadata": {}
              }
             ],
             "fix": {
              "versions": [],
              "state": "unknown"
             },
             "advisories": []
            },
            "relatedVulnerabilities": [],
            "matchDetails": [
             {
              "type": "cpe-match",
              "matcher": "stock-matcher",
              "searchedBy": {
               "namespace": "nvd:cpe",
               "cpes": [
                "cpe:2.3:a:busybox:busybox:1.34.1:*:*:*:*:*:*:*"
               ]
              },
              "found": {
               "vulnerabilityID": "CVE-2022-28391",
               "versionConstraint": "<= 1.35.0 (unknown)",
               "cpes": [
                "cpe:2.3:a:busybox:busybox:*:*:*:*:*:*:*:*"
               ]
              }
             }
            ],
            "artifact": {
             "id": "7e7f175e7d1ab63a",
             "name": "busybox",
             "version": "1.34.1",
             "type": "binary",
             "locations": [
              {
               "path": "/bin/[",
               "layerID": "sha256:ccc85b40696f6f8b1c8be7f930dd911eaa195a8964638a665b754b4be79c15b0"
              }
             ],
             "language": "",
             "licenses": [],
             "cpes": [
              "cpe:2.3:a:busybox:busybox:1.34.1:*:*:*:*:*:*:*",
              "cpe:2.3:a:busybox:busybox:1.34.1:*:*:*:*:*:*:*"
             ],
             "purl": "",
             "upstreams": []
            }
           },
           {
            "vulnerability": {
             "id": "GHSA-vvpx-j8f3-3w6h",
             "dataSource": "https://github.com/advisories/GHSA-vvpx-j8f3-3w6h",
             "namespace": "github:language:go",
             "severity": "Medium",
             "urls": [
              "https://github.com/advisories/GHSA-vvpx-j8f3-3w6h"
             ],
             "description": "Uncontrolled Resource Consumption",
             "cvss": [
              {
               "version": "3.1",
               "vector": "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:N/I:N/A:H",
               "metrics": {
                "baseScore": 7.5,
                "exploitabilityScore": 3.9,
                "impactScore": 3.6
               },
               "vendorMetadata": {
                "base_severity": "High",
                "status": "N/A"
               }
              }
             ],
             "fix": {
              "versions": [
               "0.7.0"
              ],
              "state": "fixed"
             },
             "advisories": []
            },
            "relatedVulnerabilities": [
             {
              "id": "CVE-2022-41723",
              "dataSource": "https://nvd.nist.gov/vuln/detail/CVE-2022-41723",
              "namespace": "nvd:cpe",
              "severity": "High",
              "urls": [
               "https://go.dev/cl/468135",
               "https://go.dev/cl/468295",
               "https://go.dev/issue/57855",
               "https://groups.google.com/g/golang-announce/c/V0aBFqaFs_E",
               "https://lists.fedoraproject.org/archives/list/package-announce@lists.fedoraproject.org/message/4MA5XS5DAOJ5PKKNG5TUXKPQOFHT5VBC/",
               "https://lists.fedoraproject.org/archives/list/package-announce@lists.fedoraproject.org/message/RGW7GE2Z32ZT47UFAQFDRQE33B7Q7LMT/",
               "https://lists.fedoraproject.org/archives/list/package-announce@lists.fedoraproject.org/message/RLBQ3A7ROLEQXQLXFDLNJ7MYPKG5GULE/",
               "https://lists.fedoraproject.org/archives/list/package-announce@lists.fedoraproject.org/message/XX3IMUTZKRQ73PBZM4E2JP4BKYH4C6XE/",
               "https://pkg.go.dev/vuln/GO-2023-1571"
              ],
              "description": "A maliciously crafted HTTP/2 stream could cause excessive CPU consumption in the HPACK decoder, sufficient to cause a denial of service from a small number of small requests.",
              "cvss": [
               {
                "source": "nvd@nist.gov",
                "type": "Primary",
                "version": "3.1",
                "vector": "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:N/I:N/A:H",
                "metrics": {
                 "baseScore": 7.5,
                 "exploitabilityScore": 3.9,
                 "impactScore": 3.6
                },
                "vendorMetadata": {}
               }
              ]
             }
            ],
            "matchDetails": [
             {
              "type": "exact-direct-match",
              "matcher": "go-module-matcher",
              "searchedBy": {
               "language": "go",
               "namespace": "github:language:go"
              },
              "found": {
               "versionConstraint": "<0.7.0 (unknown)",
               "vulnerabilityID": "GHSA-vvpx-j8f3-3w6h"
              }
             }
            ],
            "artifact": {
             "id": "cf2f86c828e14c41",
             "name": "golang.org/x/net",
             "version": "v0.4.0",
             "type": "go-module",
             "locations": [
              {
               "path": "/bin/alertmanager",
               "layerID": "sha256:381de408a68bc2c64d2a6fe4b6fbd8c78e3009d5e6e78d7e255a2a6912164c64"
              }
             ],
             "language": "go",
             "licenses": [],
             "cpes": [
              "cpe:2.3:a:golang:x/net:v0.4.0:*:*:*:*:*:*:*"
             ],
             "purl": "pkg:golang/golang.org/x/net@v0.4.0",
             "upstreams": [],
             "metadataType": "GolangBinMetadata",
             "metadata": {
              "goCompiledVersion": "go1.19.4",
              "architecture": "amd64",
              "h1Digest": "h1:Q5QPcMlvfxFTAPV0+07Xz/MpK9NTXu2VDUuy0FeMfaU=",
              "mainModule": "github.com/prometheus/alertmanager"
             }
            }
           },
           {
            "vulnerability": {
             "id": "GHSA-vvpx-j8f3-3w6h",
             "dataSource": "https://github.com/advisories/GHSA-vvpx-j8f3-3w6h",
             "namespace": "github:language:go",
             "severity": "High",
             "urls": [
              "https://github.com/advisories/GHSA-vvpx-j8f3-3w6h"
             ],
             "description": "Uncontrolled Resource Consumption",
             "cvss": [
              {
               "version": "3.1",
               "vector": "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:N/I:N/A:H",
               "metrics": {
                "baseScore": 7.5,
                "exploitabilityScore": 3.9,
                "impactScore": 3.6
               },
               "vendorMetadata": {
                "base_severity": "High",
                "status": "N/A"
               }
              }
             ],
             "fix": {
              "versions": [
               "0.7.0"
              ],
              "state": "fixed"
             },
             "advisories": []
            },
            "relatedVulnerabilities": [
             {
              "id": "CVE-2022-41723",
              "dataSource": "https://nvd.nist.gov/vuln/detail/CVE-2022-41723",
              "namespace": "nvd:cpe",
              "severity": "High",
              "urls": [
               "https://go.dev/cl/468135",
               "https://go.dev/cl/468295",
               "https://go.dev/issue/57855",
               "https://groups.google.com/g/golang-announce/c/V0aBFqaFs_E",
               "https://lists.fedoraproject.org/archives/list/package-announce@lists.fedoraproject.org/message/4MA5XS5DAOJ5PKKNG5TUXKPQOFHT5VBC/",
               "https://lists.fedoraproject.org/archives/list/package-announce@lists.fedoraproject.org/message/RGW7GE2Z32ZT47UFAQFDRQE33B7Q7LMT/",
               "https://lists.fedoraproject.org/archives/list/package-announce@lists.fedoraproject.org/message/RLBQ3A7ROLEQXQLXFDLNJ7MYPKG5GULE/",
               "https://lists.fedoraproject.org/archives/list/package-announce@lists.fedoraproject.org/message/XX3IMUTZKRQ73PBZM4E2JP4BKYH4C6XE/",
               "https://pkg.go.dev/vuln/GO-2023-1571"
              ],
              "description": "A maliciously crafted HTTP/2 stream could cause excessive CPU consumption in the HPACK decoder, sufficient to cause a denial of service from a small number of small requests.",
              "cvss": [
               {
                "source": "nvd@nist.gov",
                "type": "Primary",
                "version": "3.1",
                "vector": "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:N/I:N/A:H",
                "metrics": {
                 "baseScore": 7.5,
                 "exploitabilityScore": 3.9,
                 "impactScore": 3.6
                },
                "vendorMetadata": {}
               }
              ]
             }
            ],
            "matchDetails": [
             {
              "type": "exact-direct-match",
              "matcher": "go-module-matcher",
              "searchedBy": {
               "language": "go",
               "namespace": "github:language:go"
              },
              "found": {
               "versionConstraint": "<0.7.0 (unknown)",
               "vulnerabilityID": "GHSA-vvpx-j8f3-3w6h"
              }
             }
            ],
            "artifact": {
             "id": "acf66e545a09316e",
             "name": "golang.org/x/net",
             "version": "v0.4.0",
             "type": "go-module",
             "locations": [
              {
               "path": "/bin/amtool",
               "layerID": "sha256:5f1e726ad5f3c498d839619a5b52f99f3726f058cd045371b39c3cfba2865bad"
              }
             ],
             "language": "go",
             "licenses": [],
             "cpes": [
              "cpe:2.3:a:golang:x/net:v0.4.0:*:*:*:*:*:*:*"
             ],
             "purl": "pkg:golang/golang.org/x/net@v0.4.0",
             "upstreams": [],
             "metadataType": "GolangBinMetadata",
             "metadata": {
              "goCompiledVersion": "go1.19.4",
              "architecture": "amd64",
              "h1Digest": "h1:Q5QPcMlvfxFTAPV0+07Xz/MpK9NTXu2VDUuy0FeMfaU=",
              "mainModule": "github.com/prometheus/alertmanager"
             }
            }
           }
        ],
        "source": {
         "type": "image",
         "target": {
          "userInput": "quay.io/prometheus/alertmanager:v0.25.0",
          "imageID": "sha256:c8568f914cd25b2062c44e9f79f9c18da6e3b85fe0c47a12a2191c61426c2b19",
          "manifestDigest": "sha256:db8303fa05341f5dc6b19b36a97325cd1b8307254ed9042a2c554af71f3c0284",
          "mediaType": "application/vnd.docker.distribution.manifest.v2+json",
          "tags": [],
          "imageSize": 65112964,
          "layers": [
           {
            "mediaType": "application/vnd.docker.image.rootfs.diff.tar.gzip",
            "digest": "sha256:ccc85b40696f6f8b1c8be7f930dd911eaa195a8964638a665b754b4be79c15b0",
            "size": 1239764
           },
           {
            "mediaType": "application/vnd.docker.image.rootfs.diff.tar.gzip",
            "digest": "sha256:7a390b9949b1a066e4174087c2df0a1d22b7d8e87be6732f9426bec7da15d5a8",
            "size": 1419563
           },
           {
            "mediaType": "application/vnd.docker.image.rootfs.diff.tar.gzip",
            "digest": "sha256:5f1e726ad5f3c498d839619a5b52f99f3726f058cd045371b39c3cfba2865bad",
            "size": 27906085
           },
           {
            "mediaType": "application/vnd.docker.image.rootfs.diff.tar.gzip",
            "digest": "sha256:381de408a68bc2c64d2a6fe4b6fbd8c78e3009d5e6e78d7e255a2a6912164c64",
            "size": 34546840
           },
           {
            "mediaType": "application/vnd.docker.image.rootfs.diff.tar.gzip",
            "digest": "sha256:a3d850f471e04092cdfb9b30b51f20bce067d6528a65e336b2d529dfd513a9fb",
            "size": 356
           },
           {
            "mediaType": "application/vnd.docker.image.rootfs.diff.tar.gzip",
            "digest": "sha256:2d84b4a9293a49d9a8d3b90ed7f49101b701e62e2136edf1aca93837ae052603",
            "size": 356
           }
          ],
          "manifest": "ewogICAic2NoZW1hVmVyc2lvbiI6IDIsCiAgICJtZWRpYVR5cGUiOiAiYXBwbGljYXRpb24vdm5kLmRvY2tlci5kaXN0cmlidXRpb24ubWFuaWZlc3QudjIranNvbiIsCiAgICJjb25maWciOiB7CiAgICAgICJtZWRpYVR5cGUiOiAiYXBwbGljYXRpb24vdm5kLmRvY2tlci5jb250YWluZXIuaW1hZ2UudjEranNvbiIsCiAgICAgICJzaXplIjogNDc1MCwKICAgICAgImRpZ2VzdCI6ICJzaGEyNTY6Yzg1NjhmOTE0Y2QyNWIyMDYyYzQ0ZTlmNzlmOWMxOGRhNmUzYjg1ZmUwYzQ3YTEyYTIxOTFjNjE0MjZjMmIxOSIKICAgfSwKICAgImxheWVycyI6IFsKICAgICAgewogICAgICAgICAibWVkaWFUeXBlIjogImFwcGxpY2F0aW9uL3ZuZC5kb2NrZXIuaW1hZ2Uucm9vdGZzLmRpZmYudGFyLmd6aXAiLAogICAgICAgICAic2l6ZSI6IDc3MzAyNSwKICAgICAgICAgImRpZ2VzdCI6ICJzaGEyNTY6YjA4YTBhODI2MjM1MjY3N2NlM2UxMGI2OTdlYmRhNDBmZmZmY2ZiMmNjNGRkNjZhOTNmYzIyMGI5NDA4MDFmNSIKICAgICAgfSwKICAgICAgewogICAgICAgICAibWVkaWFUeXBlIjogImFwcGxpY2F0aW9uL3ZuZC5kb2NrZXIuaW1hZ2Uucm9vdGZzLmRpZmYudGFyLmd6aXAiLAogICAgICAgICAic2l6ZSI6IDQ4NzE4MCwKICAgICAgICAgImRpZ2VzdCI6ICJzaGEyNTY6ZDcxZDE1OTU5OWMzODkxNWMyMmM4NzhmZGIxM2M4NTc2ODQxMDIzMzhmNmYzM2QzZjAwMTFlMzZhZDExN2MwNCIKICAgICAgfSwKICAgICAgewogICAgICAgICAibWVkaWFUeXBlIjogImFwcGxpY2F0aW9uL3ZuZC5kb2NrZXIuaW1hZ2Uucm9vdGZzLmRpZmYudGFyLmd6aXAiLAogICAgICAgICAic2l6ZSI6IDEzMDg2NzgzLAogICAgICAgICAiZGlnZXN0IjogInNoYTI1NjowNWQyMWFiZjA1MzU3NjZhYWEzMmVjNDU0MWUxMjEzOTEyOTQ0ZDdkZWExN2U0MGU3MWE4NDE3N2Y5MDAwYjY4IgogICAgICB9LAogICAgICB7CiAgICAgICAgICJtZWRpYVR5cGUiOiAiYXBwbGljYXRpb24vdm5kLmRvY2tlci5pbWFnZS5yb290ZnMuZGlmZi50YXIuZ3ppcCIsCiAgICAgICAgICJzaXplIjogMTY0MzQzNDksCiAgICAgICAgICJkaWdlc3QiOiAic2hhMjU2OmM0ZGM0M2NjODY4NTNmNDBkOTlkNjE5OTU3MGU5ZjgyMzg1NmZhM2U3OTkyZGNkN2ViZTk0ZmE0ZDMyYTBhZTYiCiAgICAgIH0sCiAgICAgIHsKICAgICAgICAgIm1lZGlhVHlwZSI6ICJhcHBsaWNhdGlvbi92bmQuZG9ja2VyLmltYWdlLnJvb3Rmcy5kaWZmLnRhci5nemlwIiwKICAgICAgICAgInNpemUiOiAzNTYsCiAgICAgICAgICJkaWdlc3QiOiAic2hhMjU2OmFmZjg1MGExMWUzMTgyMjBlNjBkODJlNzA1Njc0YTEyZTUwZmI5NmRlNDY0NGFiNjY1YjI4NjVkN2M3ODM3OTYiCiAgICAgIH0sCiAgICAgIHsKICAgICAgICAgIm1lZGlhVHlwZSI6ICJhcHBsaWNhdGlvbi92bmQuZG9ja2VyLmltYWdlLnJvb3Rmcy5kaWZmLnRhci5nemlwIiwKICAgICAgICAgInNpemUiOiAzNzYsCiAgICAgICAgICJkaWdlc3QiOiAic2hhMjU2OjZjNDc3YThjYzIyMGNiZTRjMWZmZGQ5Y2I1MDVjYTgyMjg0MjkyYzM2N2EwMzMzNWM1YmQ1OTBmZjBjNjUxZmMiCiAgICAgIH0KICAgXQp9",
          "config": "eyJhcmNoaXRlY3R1cmUiOiJhbWQ2NCIsImNvbmZpZyI6eyJIb3N0bmFtZSI6IiIsIkRvbWFpbm5hbWUiOiIiLCJVc2VyIjoibm9ib2R5IiwiQXR0YWNoU3RkaW4iOmZhbHNlLCJBdHRhY2hTdGRvdXQiOmZhbHNlLCJBdHRhY2hTdGRlcnIiOmZhbHNlLCJFeHBvc2VkUG9ydHMiOnsiOTA5My90Y3AiOnt9fSwiVHR5IjpmYWxzZSwiT3BlblN0ZGluIjpmYWxzZSwiU3RkaW5PbmNlIjpmYWxzZSwiRW52IjpbIlBBVEg9L3Vzci9sb2NhbC9zYmluOi91c3IvbG9jYWwvYmluOi91c3Ivc2JpbjovdXNyL2Jpbjovc2JpbjovYmluIl0sIkNtZCI6WyItLWNvbmZpZy5maWxlPS9ldGMvYWxlcnRtYW5hZ2VyL2FsZXJ0bWFuYWdlci55bWwiLCItLXN0b3JhZ2UucGF0aD0vYWxlcnRtYW5hZ2VyIl0sIkltYWdlIjoic2hhMjU2OjI0NjJkYjRjMTc3MWY4ZDJjZjZkZWFmYTFjZGJhZTZiZjkyNTllYmFiMDc4Mzg0NjNlZDkyOGRmN2I1NjQxMTUiLCJWb2x1bWVzIjp7Ii9hbGVydG1hbmFnZXIiOnt9fSwiV29ya2luZ0RpciI6Ii9hbGVydG1hbmFnZXIiLCJFbnRyeXBvaW50IjpbIi9iaW4vYWxlcnRtYW5hZ2VyIl0sIk9uQnVpbGQiOm51bGwsIkxhYmVscyI6eyJtYWludGFpbmVyIjoiVGhlIFByb21ldGhldXMgQXV0aG9ycyBcdTAwM2Nwcm9tZXRoZXVzLWRldmVsb3BlcnNAZ29vZ2xlZ3JvdXBzLmNvbVx1MDAzZSJ9fSwiY29udGFpbmVyIjoiNmQ1OWFjOWI4ZjdhNTg4Y2NlYjgzYmE4ZGNmNzNjZmJjZjE3MWMxOWZmODczMzljNTU1NGM0MmZiNGM0YTgzOCIsImNvbnRhaW5lcl9jb25maWciOnsiSG9zdG5hbWUiOiI2ZDU5YWM5YjhmN2EiLCJEb21haW5uYW1lIjoiIiwiVXNlciI6Im5vYm9keSIsIkF0dGFjaFN0ZGluIjpmYWxzZSwiQXR0YWNoU3Rkb3V0IjpmYWxzZSwiQXR0YWNoU3RkZXJyIjpmYWxzZSwiRXhwb3NlZFBvcnRzIjp7IjkwOTMvdGNwIjp7fX0sIlR0eSI6ZmFsc2UsIk9wZW5TdGRpbiI6ZmFsc2UsIlN0ZGluT25jZSI6ZmFsc2UsIkVudiI6WyJQQVRIPS91c3IvbG9jYWwvc2JpbjovdXNyL2xvY2FsL2JpbjovdXNyL3NiaW46L3Vzci9iaW46L3NiaW46L2JpbiJdLCJDbWQiOlsiL2Jpbi9zaCIsIi1jIiwiIyhub3ApICIsIkNNRCBbXCItLWNvbmZpZy5maWxlPS9ldGMvYWxlcnRtYW5hZ2VyL2FsZXJ0bWFuYWdlci55bWxcIiBcIi0tc3RvcmFnZS5wYXRoPS9hbGVydG1hbmFnZXJcIl0iXSwiSW1hZ2UiOiJzaGEyNTY6MjQ2MmRiNGMxNzcxZjhkMmNmNmRlYWZhMWNkYmFlNmJmOTI1OWViYWIwNzgzODQ2M2VkOTI4ZGY3YjU2NDExNSIsIlZvbHVtZXMiOnsiL2FsZXJ0bWFuYWdlciI6e319LCJXb3JraW5nRGlyIjoiL2FsZXJ0bWFuYWdlciIsIkVudHJ5cG9pbnQiOlsiL2Jpbi9hbGVydG1hbmFnZXIiXSwiT25CdWlsZCI6bnVsbCwiTGFiZWxzIjp7Im1haW50YWluZXIiOiJUaGUgUHJvbWV0aGV1cyBBdXRob3JzIFx1MDAzY3Byb21ldGhldXMtZGV2ZWxvcGVyc0Bnb29nbGVncm91cHMuY29tXHUwMDNlIn19LCJjcmVhdGVkIjoiMjAyMi0xMi0yMlQxNToxNzo1My4yNTYxOTg5NTFaIiwiZG9ja2VyX3ZlcnNpb24iOiIyMC4xMC4xOCIsImhpc3RvcnkiOlt7ImNyZWF0ZWQiOiIyMDIyLTEyLTA3VDAxOjIzOjU4LjIwNjU1ODM3OVoiLCJjcmVhdGVkX2J5IjoiL2Jpbi9zaCAtYyAjKG5vcCkgQUREIGZpbGU6MzIzMDJlYmZmZWM1Nzg1OTI5OWU0OWU1NGY4ZTNlNGJhM2FkMTdiZjdkNGNkNTRhNWVkYWMzNTI1Y2Q2ZDJiOCBpbiAvICJ9LHsiY3JlYXRlZCI6IjIwMjItMTItMDdUMDE6MjM6NTguMzE3OTc3MjY3WiIsImNyZWF0ZWRfYnkiOiIvYmluL3NoIC1jICMobm9wKSAgQ01EIFtcInNoXCJdIiwiZW1wdHlfbGF5ZXIiOnRydWV9LHsiY3JlYXRlZCI6IjIwMjItMTItMTVUMTA6NTQ6NTYuNTE2NjgxOThaIiwiYXV0aG9yIjoiVGhlIFByb21ldGhldXMgQXV0aG9ycyBcdTAwM2Nwcm9tZXRoZXVzLWRldmVsb3BlcnNAZ29vZ2xlZ3JvdXBzLmNvbVx1MDAzZSIsImNyZWF0ZWRfYnkiOiIvYmluL3NoIC1jICMobm9wKSAgTUFJTlRBSU5FUiBUaGUgUHJvbWV0aGV1cyBBdXRob3JzIFx1MDAzY3Byb21ldGhldXMtZGV2ZWxvcGVyc0Bnb29nbGVncm91cHMuY29tXHUwMDNlIiwiZW1wdHlfbGF5ZXIiOnRydWV9LHsiY3JlYXRlZCI6IjIwMjItMTItMTVUMTA6NTQ6NTcuMjIxMzA2MTg1WiIsImF1dGhvciI6IlRoZSBQcm9tZXRoZXVzIEF1dGhvcnMgXHUwMDNjcHJvbWV0aGV1cy1kZXZlbG9wZXJzQGdvb2dsZWdyb3Vwcy5jb21cdTAwM2UiLCJjcmVhdGVkX2J5IjoiL2Jpbi9zaCAtYyAjKG5vcCkgQ09QWSBkaXI6MDJjOTYxZTIxNTMxYmU3OGE2N2VkOWJhZDY3ZDAzMzkxY2ZlZGNlYWQ4YjBhMzVjZmI5MTcxMzQ2NjM2ZjExYSBpbiAvICJ9LHsiY3JlYXRlZCI6IjIwMjItMTItMjJUMTU6MTc6NTEuNTA0MjI0Mjk2WiIsImNyZWF0ZWRfYnkiOiIvYmluL3NoIC1jICMobm9wKSAgTEFCRUwgbWFpbnRhaW5lcj1UaGUgUHJvbWV0aGV1cyBBdXRob3JzIFx1MDAzY3Byb21ldGhldXMtZGV2ZWxvcGVyc0Bnb29nbGVncm91cHMuY29tXHUwMDNlIiwiZW1wdHlfbGF5ZXIiOnRydWV9LHsiY3JlYXRlZCI6IjIwMjItMTItMjJUMTU6MTc6NTEuNTg3Njg0NDk2WiIsImNyZWF0ZWRfYnkiOiIvYmluL3NoIC1jICMobm9wKSAgQVJHIEFSQ0g9YW1kNjQiLCJlbXB0eV9sYXllciI6dHJ1ZX0seyJjcmVhdGVkIjoiMjAyMi0xMi0yMlQxNToxNzo1MS42NzA1MTM4NzNaIiwiY3JlYXRlZF9ieSI6Ii9iaW4vc2ggLWMgIyhub3ApICBBUkcgT1M9bGludXgiLCJlbXB0eV9sYXllciI6dHJ1ZX0seyJjcmVhdGVkIjoiMjAyMi0xMi0yMlQxNToxNzo1MS45MTg1NTQzNloiLCJjcmVhdGVkX2J5IjoiL2Jpbi9zaCAtYyAjKG5vcCkgQ09QWSBmaWxlOjNiMjQ4M2E3ZDM4ZWM4ZmJlYWE3ZThiMmE4MzAzMjRiYjc0Zjg2Zjc2Y2Q4MGQ3NWE3ZWJhZjBiZTQwM2UxNjEgaW4gL2Jpbi9hbXRvb2wgIn0seyJjcmVhdGVkIjoiMjAyMi0xMi0yMlQxNToxNzo1Mi4yMDExODA0MzZaIiwiY3JlYXRlZF9ieSI6Ii9iaW4vc2ggLWMgIyhub3ApIENPUFkgZmlsZTowMGZhMzBhYTBiMGU5NDE4Mjk4ODFiYTI1MTM5NmJlNDVmNGZhYTNiMDc3ZmI2ZGE2ZGY5ODhjMGVlNGI4MGY1IGluIC9iaW4vYWxlcnRtYW5hZ2VyICJ9LHsiY3JlYXRlZCI6IjIwMjItMTItMjJUMTU6MTc6NTIuMzM2ODQ3NTc3WiIsImNyZWF0ZWRfYnkiOiIvYmluL3NoIC1jICMobm9wKSBDT1BZIGZpbGU6MWFjNmYzNmM5ZmEyYmUzMWJmNzNlODllOTAyZDNiYjFjMzkwYjFiODBjY2Y4MzY3NWIwYTA5Mzk0YmZhYTEyZSBpbiAvZXRjL2FsZXJ0bWFuYWdlci9hbGVydG1hbmFnZXIueW1sICJ9LHsiY3JlYXRlZCI6IjIwMjItMTItMjJUMTU6MTc6NTIuNzUxODI0MTM1WiIsImNyZWF0ZWRfYnkiOiJ8MiBBUkNIPWFtZDY0IE9TPWxpbnV4IC9iaW4vc2ggLWMgbWtkaXIgLXAgL2FsZXJ0bWFuYWdlciBcdTAwMjZcdTAwMjYgICAgIGNob3duIC1SIG5vYm9keTpub2JvZHkgZXRjL2FsZXJ0bWFuYWdlciAvYWxlcnRtYW5hZ2VyIn0seyJjcmVhdGVkIjoiMjAyMi0xMi0yMlQxNToxNzo1Mi44MzE4NDI4NjZaIiwiY3JlYXRlZF9ieSI6Ii9iaW4vc2ggLWMgIyhub3ApICBVU0VSIG5vYm9keSIsImVtcHR5X2xheWVyIjp0cnVlfSx7ImNyZWF0ZWQiOiIyMDIyLTEyLTIyVDE1OjE3OjUyLjkxOTYxNjcxN1oiLCJjcmVhdGVkX2J5IjoiL2Jpbi9zaCAtYyAjKG5vcCkgIEVYUE9TRSA5MDkzIiwiZW1wdHlfbGF5ZXIiOnRydWV9LHsiY3JlYXRlZCI6IjIwMjItMTItMjJUMTU6MTc6NTMuMDAzNTAwNzVaIiwiY3JlYXRlZF9ieSI6Ii9iaW4vc2ggLWMgIyhub3ApICBWT0xVTUUgWy9hbGVydG1hbmFnZXJdIiwiZW1wdHlfbGF5ZXIiOnRydWV9LHsiY3JlYXRlZCI6IjIwMjItMTItMjJUMTU6MTc6NTMuMDg3NjE5OTI0WiIsImNyZWF0ZWRfYnkiOiIvYmluL3NoIC1jICMobm9wKSBXT1JLRElSIC9hbGVydG1hbmFnZXIiLCJlbXB0eV9sYXllciI6dHJ1ZX0seyJjcmVhdGVkIjoiMjAyMi0xMi0yMlQxNToxNzo1My4xNzQwNzQ5OVoiLCJjcmVhdGVkX2J5IjoiL2Jpbi9zaCAtYyAjKG5vcCkgIEVOVFJZUE9JTlQgW1wiL2Jpbi9hbGVydG1hbmFnZXJcIl0iLCJlbXB0eV9sYXllciI6dHJ1ZX0seyJjcmVhdGVkIjoiMjAyMi0xMi0yMlQxNToxNzo1My4yNTYxOTg5NTFaIiwiY3JlYXRlZF9ieSI6Ii9iaW4vc2ggLWMgIyhub3ApICBDTUQgW1wiLS1jb25maWcuZmlsZT0vZXRjL2FsZXJ0bWFuYWdlci9hbGVydG1hbmFnZXIueW1sXCIgXCItLXN0b3JhZ2UucGF0aD0vYWxlcnRtYW5hZ2VyXCJdIiwiZW1wdHlfbGF5ZXIiOnRydWV9XSwib3MiOiJsaW51eCIsInJvb3RmcyI6eyJ0eXBlIjoibGF5ZXJzIiwiZGlmZl9pZHMiOlsic2hhMjU2OmNjYzg1YjQwNjk2ZjZmOGIxYzhiZTdmOTMwZGQ5MTFlYWExOTVhODk2NDYzOGE2NjViNzU0YjRiZTc5YzE1YjAiLCJzaGEyNTY6N2EzOTBiOTk0OWIxYTA2NmU0MTc0MDg3YzJkZjBhMWQyMmI3ZDhlODdiZTY3MzJmOTQyNmJlYzdkYTE1ZDVhOCIsInNoYTI1Njo1ZjFlNzI2YWQ1ZjNjNDk4ZDgzOTYxOWE1YjUyZjk5ZjM3MjZmMDU4Y2QwNDUzNzFiMzljM2NmYmEyODY1YmFkIiwic2hhMjU2OjM4MWRlNDA4YTY4YmMyYzY0ZDJhNmZlNGI2ZmJkOGM3OGUzMDA5ZDVlNmU3OGQ3ZTI1NWEyYTY5MTIxNjRjNjQiLCJzaGEyNTY6YTNkODUwZjQ3MWUwNDA5MmNkZmI5YjMwYjUxZjIwYmNlMDY3ZDY1MjhhNjVlMzM2YjJkNTI5ZGZkNTEzYTlmYiIsInNoYTI1NjoyZDg0YjRhOTI5M2E0OWQ5YThkM2I5MGVkN2Y0OTEwMWI3MDFlNjJlMjEzNmVkZjFhY2E5MzgzN2FlMDUyNjAzIl19fQ==",
          "repoDigests": [
           "quay.io/prometheus/alertmanager@sha256:fd4d9a3dd1fd0125108417be21be917f19cc76262347086509a0d43f29b80e98"
          ],
          "architecture": "amd64",
          "os": "linux"
         }
        },
        "distro": {
         "name": "busybox",
         "version": "1.34.1",
         "idLike": [
          "busybox"
         ]
        },
        "descriptor": {
         "name": "grype",
         "version": "0.62.3",
         "configuration": {
          "configPath": "/Users/taddlerocque/config.yaml",
          "verbosity": 0,
          "output": "json",
          "file": "",
          "distro": "",
          "add-cpes-if-none": false,
          "output-template-file": "",
          "quiet": false,
          "check-for-app-update": true,
          "only-fixed": false,
          "only-notfixed": false,
          "platform": "",
          "search": {
           "scope": "Squashed",
           "unindexed-archives": false,
           "indexed-archives": true
          },
          "ignore": null,
          "exclude": [],
          "db": {
           "cache-dir": "/Users/taddlerocque/Library/Caches/grype/db",
           "update-url": "https://toolbox-data.anchore.io/grype/databases/listing.json",
           "ca-cert": "",
           "auto-update": true,
           "validate-by-hash-on-start": false,
           "validate-age": true,
           "max-allowed-built-age": 432000000000000
          },
          "externalSources": {
           "enable": false,
           "maven": {
            "searchUpstreamBySha1": true,
            "baseUrl": "https://search.maven.org/solrsearch/select"
           }
          },
          "match": {
           "java": {
            "using-cpes": true
           },
           "dotnet": {
            "using-cpes": true
           },
           "golang": {
            "using-cpes": true
           },
           "javascript": {
            "using-cpes": false
           },
           "python": {
            "using-cpes": true
           },
           "ruby": {
            "using-cpes": true
           },
           "stock": {
            "using-cpes": true
           }
          },
          "dev": {
           "profile-cpu": false,
           "profile-mem": false
          },
          "fail-on-severity": "",
          "registry": {
           "insecure-skip-tls-verify": false,
           "insecure-use-http": false,
           "auth": []
          },
          "log": {
           "structured": false,
           "level": "warn",
           "file": ""
          },
          "show-suppressed": false,
          "by-cve": false,
          "name": "",
          "default-image-pull-source": ""
         },
         "db": {
          "built": "2023-06-17T01:34:57Z",
          "schemaVersion": 5,
          "location": "/Users/taddlerocque/Library/Caches/grype/db/5",
          "checksum": "sha256:e6b77b0bac2a5ed5f341dc5942f3ff46f847410bab2bf2305a5b7eb274296b52",
          "error": null
         },
         "timestamp": "2023-06-17T11:44:31.777106-04:00"
        }
       }
    setTimeout(() => {
        console.log('stalling')
        res.status(200).json(response);
    }, 5000)
    
})


export { podRouter };
 ![iab tech lab](https://user-images.githubusercontent.com/19175352/38649177-0d37d17c-3daa-11e8-8934-f0fb47919716.png)
 # Transparency and Consent String with Global Vendor & CMP List Formats
 **IAB Europe Transparency & Consent Framework**

 **Final v.2.0 | August 2019, Updated December 2019**

 Table of Contents

 * [Version History:](#version-history)
 * [Introduction](#introduction)
   + [Audience](#audience)
   + [Relevant Documents](#relevant-documents)
   + [About the Transparency & Consent Framework](#about-the-transparency--consent-framework)
   + [License](#license)
   + [About IAB Tech Lab](#about-iab-tech-lab)
   + [About IAB Europe](#about-iab-europe)
 * [About the Transparency & Consent String (TC String)](#about-the-transparency--consent-string-tc-string)
   + [Definitions](#definitions)
   + [What purpose does a TC String serve?](#what-purpose-does-a-tc-string-serve)
   + [What information is stored in a TC String?](#what-information-is-stored-in-a-tc-string)
   + [Who should create a TC string?](#who-should-create-a-tc-string)
   + [When should a TC string be created?](#when-should-a-tc-string-be-created)
   + [What are the different scopes for a TC String?](#what-are-the-different-scopes-for-a-tc-string)
   + [What are publisher restrictions?](#what-are-publisher-restrictions)
   + [How does the CMP handle a globally-scoped TC string?](#how-does-the-cmp-handle-a-globally-scoped-tc-string)
   + [How does a vendor retrieve the TC string when it is not participating in a bid request and cannot execute JavaScript?](#how-does-a-vendor-retrieve-the-tc-string-when-it-is-not-participating-in-a-bid-request-and-cannot-execute-javascript)
     - [Macro Format, Parameters and Values](#macro-format-parameters-and-values)
     - [Expectations for Macro Expansion](#expectations-for-macro-expansion)
     - [CMP Redirect for TC String](#cmp-redirect-for-tc-string)
   + [What if consent is governed differently in a country?](#what-if-consent-is-governed-differently-in-a-country)
 * [Creating a TC String](#creating-a-tc-string)
   + [How should a Transparency & Consent String be stored?](#how-should-a-transparency--consent-string-be-stored)
   + [What are the Purposes and Features being supported?](#what-are-the-purposes-and-features-being-supported)
   + [How should a global TC string be formatted for storage?](#how-should-a-global-tc-string-be-formatted-for-storage)
   + [TC String Format](#tc-string-format)
     - [The Core String](#the-core-string)
     - [Signaling OOB in the TC String](#signaling-oob-in-the-tc-string)
     - [Disclosed Vendors (OOB)](#disclosed-vendors-oob)
     - [Allowed Vendors (OOB)](#allowed-vendors-oob)
     - [Publisher Purposes Transparency and Consent](#publisher-purposes-transparency-and-consent)
 * [The Global Vendor List](#the-global-vendor-list)
   + [I’m a vendor, how do I get added to the Global Vendor List?](#im-a-vendor-how-do-i-get-added-to-the-global-vendor-list)
   + [What is contained in the Global Vendor List?](#what-is-contained-in-the-global-vendor-list)
   + [Where can I access the Global Vendor List?](#where-can-i-access-the-global-vendor-list)
   + [TCF version 1 of the Global Vendor List (deprecated)](#tcf-version-1-of-the-global-vendor-list-deprecated)
   + [Translations for Purposes, Special Purposes, Features, and Special Features](#translations-for-purposes-special-purposes-features-and-special-features)
   + [How often is the Global Vendor List updated?](#how-often-is-the-global-vendor-list-updated)
   + [CMPs using the GVL](#cmps-using-the-gvl)
   + [Vendors using the GVL](#vendors-using-the-gvl)
   + [Accessing And Caching the Global Vendor List](#accessing-and-caching-the-global-vendor-list)
     - [CMPs accessing and caching the GVL](#cmps-accessing-and-caching-the-gvl)
     - [Vendors accessing and caching the GVL](#vendors-accessing-and-caching-the-gvl)
     - [Using a compressed version of the Global Vendor List](#using-a-compressed-version-of-the-global-vendor-list)
     - [Global Vendor List and TCF Policy Updates](#global-vendor-list-and-tcf-policy-updates)
   + [Example Global Vendor List JSON Object](#example-global-vendor-list-json-object)
 * [Global CMP List](#Global-CMP-List-Specification)
   + [What is contained in the Global CMP List?](#what-is-contained-in-the-Global-CMP-list)
   + [Where can I access the Global CMP List?](#where-can-i-access-the-Global-CMP-list)
   + [How often is the Global CMP List updated?](#how-often-is-the-Global-CMP-list-updated)
   + [Caching the Global CMP List](#caching-the-Global-CMP-list)
   + [Server-side caching of the GCL](#server-side-caching-of-the-GCL)
   + [Using a compressed version of the Global CMP List](#using-a-compressed-version-of-the-Global-CMP-list)
   + [Example Global CMP List JSON Object](#example-global-CMP-list-json-object)

 ## Version History:

| Date | Version | Comments |
| :-- | :-- | :-- |
| May 2021 | 2.0 | Special Purpose only vendors transparency clarification |
| December 2020 | 2.0 | Domain name change for GVL resources |
| May 2020 | 2.0 | Updated to clarify questions on `RestrictionType` cases |
| December 2019 | 2.0 | Updated with global cookie support notes, Updated macros to be upper case |
| August 2019 | 2.0 | Version 2.0 released to the public |
| April 2019 | 2.0 | Released for public comment |
| April 2018 | 1.1 | First version released to the public |

## Introduction

This document is one of the IAB Europe Transparency and Consent Framework Specifications. It defines the technical implementation of the structure and encoding for a Transparency and Consent String (TC String), and the format for a [Global Vendor List (GVL)](#the-global-vendor-list) maintained by IAB Europe. The TC String is a technical component of the IAB Europe Transparency & Consent Framework (TCF).

The General Data Protection Regulation (GDPR) requires a high level of accountability for how personal data is processed. While important to all parties in the digital advertising ecosystem, implementation of the GDPR came with heavy technical challenges.

The GDPR requires, amongst others, a legal basis for such processing. The two most relevant legal bases are the consent of the user to the processing of their personal data, and the legitimate interests of the controller or a third party to the processing of a user’s personal data, provided that the interests and fundamental rights of the user are not overriding. Both legal bases require the provision of disclosures to ensure transparency, and the opportunity for user choice either through the user’s consent to the processing of their personal data before the processing starts if the legal basis is consent, or through the user’s objection to the processing of their personal data after the processing starts if the legal basis is a legitimate interest. Under the GDPR, controllers are required to create and maintain records of compliance, including, but not limited to user consent records. This warrants clear standards for a common technical solution for all affected parties and policies to govern how that solution is used.

IAB Europe established the TCF to support compliance with the GDPR in the context of digital advertising. This framework is built on four components: a [Global Vendor List (GVL)](#the-global-vendor-list), a Transparency and Consent String (TC String), an API for Consent Management Providers (CMPs) to create and process the TC String, and the Policies that govern how the TCF is used.

Prescribed use of the TCF may support compliance with the GDPR, but the real benefit to the digital advertising ecosystem is a safer Internet for consumers, and more reliable data for brands and publishers. As adoption of the TCF increases, compliance becomes more scalable and data becomes more meaningful.

To participate in the use of the TCF, vendors must make a public attestation of compliance with the [Policies](https://iabeurope.eu/iab-europe-transparency-consent-framework-policies/) for using it. To have transparency and consent established and signaled status for your online services stored in a global database, apply to be added to the [GVL](#the-global-vendor-list). To play a role in creating a TC String for signaling status on transparency and user consent, sign up with IAB Europe to become a CMP. CMPs must follow technical standards provided in this document for creating TC Strings in compliance with TCF [Policies](https://iabeurope.eu/iab-europe-transparency-consent-framework-policies/). They must also follow technical standards guidance for using the CMP API specified in this document to receive and process information provided in a TC String.

### Audience

Engineers for a registered CMP can use this document to design or update a solution for generating a TC String. In particular, first parties (content publishers, advertisers, and other suppliers of online services) and third-party (vendors for data-driven services) organisations should be familiar with the purpose and scope of a TC String as well as what information it provides, and support its implementation.


### Relevant Documents

[IAB Europe Transparency & Consent Framework Policies](https://iabeurope.eu/iab-europe-transparency-consent-framework-policies/)

[Consent Manager Provider JS API](IAB%20Tech%20Lab%20-%20CMP%20API%20v2.md)

### About the Transparency & Consent Framework

IAB Europe Transparency & Consent Framework (TCF) has a simple objective to help all parties in the digital advertising chain ensure that they comply with the EU’s General Data Protection Regulation and ePrivacy Directive when processing personal data or accessing and/or storing information on a user’s device, such as cookies, advertising identifiers, device identifiers and other tracking technologies. IAB Tech Lab stewards the development of these technical specifications.

Resources including policy FAQ, [Global Vendor List](#the-global-vendor-list), and CMP List can be found at [iabeurope.eu/tcf](https://iabeurope.eu/tcf).




### License

IAB Europe Transparency and Consent Framework technical specifications governed by the IAB Tech Lab is licensed under a Creative Commons Attribution 3.0 License.   To view a copy of this license, visit[ creativecommons.org/licenses/by/3.0/](https://creativecommons.org/licenses/by/3.0/) or write to Creative Commons, 171 Second Street, Suite 300, San Francisco, CA 94105, USA.

![](https://drive.google.com/uc?id=1cbwEGlb8S69SndIDoHnvc5_3TfmkGM7R)


Disclaimer

THE STANDARDS, THE SPECIFICATIONS, THE MEASUREMENT GUIDELINES, AND ANY OTHER MATERIALS OR SERVICES PROVIDED TO OR USED BY YOU HEREUNDER (THE “PRODUCTS AND SERVICES”) ARE PROVIDED “AS IS” AND “AS AVAILABLE,” AND IAB TECHNOLOGY LABORATORY, INC. (“TECH LAB”) MAKES NO WARRANTY WITH RESPECT TO THE SAME AND HEREBY DISCLAIMS ANY AND ALL EXPRESS, IMPLIED, OR STATUTORY WARRANTIES, INCLUDING, WITHOUT LIMITATION, ANY WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AVAILABILITY, ERROR-FREE OR UNINTERRUPTED OPERATION, AND ANY WARRANTIES ARISING FROM A COURSE OF DEALING, COURSE OF PERFORMANCE, OR USAGE OF TRADE.  TO THE EXTENT THAT TECH LAB MAY NOT AS A MATTER OF APPLICABLE LAW DISCLAIM ANY IMPLIED WARRANTY, THE SCOPE AND DURATION OF SUCH WARRANTY WILL BE THE MINIMUM PERMITTED UNDER SUCH LAW.  THE PRODUCTS AND SERVICES DO NOT CONSTITUTE BUSINESS OR LEGAL ADVICE.  TECH LAB DOES NOT WARRANT THAT THE PRODUCTS AND SERVICES PROVIDED TO OR USED BY YOU HEREUNDER SHALL CAUSE YOU AND/OR YOUR PRODUCTS OR SERVICES TO BE IN COMPLIANCE WITH ANY APPLICABLE LAWS, REGULATIONS, OR SELF-REGULATORY FRAMEWORKS, AND YOU ARE SOLELY RESPONSIBLE FOR COMPLIANCE WITH THE SAME.



### About IAB Tech Lab

The IAB Technology Laboratory (Tech Lab) is a non-profit consortium that engages a member community globally to develop foundational technology and standards that enable growth and trust in the digital media ecosystem.. Comprised of digital publishers, ad technology firms, agencies, marketers, and other member companies, IAB Tech Lab focuses on improving the digital advertising supply chain, measurement, and consumer experiences, while promoting responsible use of data. Its work includes the OpenRTB real-time bidding protocol, ads.txt anti-fraud specification, Open Measurement SDK for viewability and verification, VAST video specification, and DigiTrust identity service. Board members include ExtremeReach, Facebook, Google, GroupM, Hearst Digital Media, Index Exchange, Integral Ad Science, LinkedIn, LiveRamp, MediaMath, Microsoft, Oracle Data Cloud, Pandora, PubMatic, Quantcast, Rakuten Marketing, Telaria, The Trade Desk, Verizon Media Group, Xandr, and Yahoo! Japan. Established in 2014, the IAB Tech Lab is headquartered in New York City with staff in San Francisco, Seattle, and London. Learn more at [https://www.iabtechlab.com](https://www.iabtechlab.com/).



### About IAB Europe

IAB Europe is the European-level association for the digital marketing and advertising ecosystem. Through its membership of National IABs and media, technology and marketing companies, its mission is to lead political representation and promote industry collaboration to deliver frameworks, standards and industry programmes that enable business to thrive in the European market.

Learn more about IAB Europe here: [https://www.iabeurope.eu/](https://www.iabeurope.eu/)



## About the Transparency & Consent String (TC String)

In the TCF, a TC String is used to encapsulate relevant details about how transparency and consent was established and encoded as it applies for each of the Purposes, Special Purposes, Features, and Special Features defined by the [Policies](https://iabeurope.eu/iab-europe-transparency-consent-framework-policies/) and for participating Vendors. This document specifies how that string must be formatted, who should use it, and how it must be used.



### Definitions

Regarding specific definitions as they relate to TCF [Policies](https://iabeurope.eu/iab-europe-transparency-consent-framework-policies/) and the technology described in this document, please refer to IAB Europe Transparency and Consent Framework Policies located at the following link:

[https://iabeurope.eu/iab-europe-transparency-consent-framework-policies/](https://iabeurope.eu/iab-europe-transparency-consent-framework-policies/)



 ### What purpose does a TC String serve?

A TC String’s primary purpose is to encapsulate and encode all the information disclosed to a user and the expression of their preferences for their personal data processing under the GDPR. Using a Consent Management Platform (CMP), the information is captured into an encoded and compact  HTTP-transferable string. This string enables communication of transparency and consent information to entities, or “vendors”, that process a user's personal data. Vendors decode a TC String to determine whether they have the necessary legal bases to  process a user's personal data for their purposes. The concise string data format enables a  CMP to persist and retrieve a user’s preferences any time they're needed as well as transfer that information to any vendors who need it.


### What information is stored in a TC String?

A TC String contains the following information:



1. **General metadata:** standard markers that indicate details about a TC String such as its encoding version, when it was last updated, and when it was initially created as well as details about the conditions of the transparency and consent values it contains such as the [Global Vendor List](#the-global-vendor-list) version used, the CMP used, etc.
2. **User consent:** a user’s expression of consent given for processing their personal data. A user’s consent is expressed on two levels: per Purpose and per Vendor.
3. **Legitimate interest:** the record of a CMP having established legitimate interest transparency for a vendor and/or purpose and whether the user exercised their “Right to Object” to it.  This includes signals for Purposes in general and Purposes declared specifically for a given Vendor.
4. **Publisher restrictions:** the restrictions of a vendor's data processing by a publisher within the context of the users trafficking their digital property.
5. **Publisher transparency and consent:** a segment of a TC String that publishers may use to establish transparency with and receive consent from users for their own legal bases to process personal data or to share with vendors if they so choose.
6. **Out-of-band (OOB) legal bases:** two segments expressing that a Vendor is using  legal bases outside of the TCF to process personal data. The first segment is a list of Vendors disclosed to the user and the second is a list of Vendors that the publisher allows to use out-of-band legal bases.
7. **Specific jurisdiction disclosures:** the country in which the publisher’s business entity is established or the legislative country of reference and a record of whether Purpose 1, “[to] store and/or access information on a device,” was disclosed to the user since some jurisdictions handle this Purpose differently.


### Who should create a TC string?

A Transparency & Consent String may only be created by an IAB Europe TCF registered CMP using its assigned CMP ID number in accordance with the [Policies](https://iabeurope.eu/iab-europe-transparency-consent-framework-policies/). Vendors or any other third-party service providers must neither create nor alter TC Strings. These and other requirements are articulated in the [Policies](https://iabeurope.eu/iab-europe-transparency-consent-framework-policies/) to which all parties including CMPs, Publishers, and Vendors, are bound.


### When should a TC string be created?

A TC String that contains positive consent signals must not be created before clear affirmative action is taken by a user that unambiguously signifies that user’s consent. However, a TC String may be created with only legitimate interest establishment signals providing that legitimate interest transparency has been established in accordance with the [Policies](https://iabeurope.eu/iab-europe-transparency-consent-framework-policies/).


### What are the different scopes for a TC String?

There are two main contexts in which a TC String can be created:

*   **Global** - A TC String in this context is saved globally and is shared by CMPs running on sites across the web; When stored globally, they must <span style="text-decoration:underline;">NOT</span> contain [Publisher restrictions](#what-are-publisher-restrictions) or a _**[Publisher TC](#publisher-purposes-transparency-and-consent)**_ segment but they may contain a _**[DisclosedVendors](#disclosed-vendors-oob)**_ segment.
*   **Service-specific** - A  TC String in this context is only used by the site(s) or app(s) on which it is running. One is created for every user on a given site/app or group of sites/apps. They may contain [Publisher restrictions](#what-are-publisher-restrictions), a _**[Publisher TC](#publisher-purposes-transparency-and-consent)**_ segment and an _**[AllowedVendors](#allowed-vendors-oob)**_ segment.

CMPs must be set up to operate in either a service-specific or global configuration. If a Publisher-operated CMP declares that the personal data processing purpose is, for example, on this site and on other sites or apps where third-party companies also operate, then the scope is global and that TC String is used and stored in a global context.

If the disclosures do not describe a global scope, or explicitly state service-specific processing, then the TC String is used and stored explicitly as a service-specific string. Also, if the CMP discloses transparency and consent in a global context but the user’s browser does not permit third-party cookies, then the CMP’s only recourse is to retain the user’s preference using a local storage mechanism (eg. first-party cookie or [window.localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)). Since the transparency and consent obtained from the user is restricted to that site or service, the TC String must then have the service-specific bit [IsServiceSpecific](#tc-string-format) set.


### What are publisher restrictions?

Version 2.0 of the Framework introduced the ability for publishers to signal restrictions on how vendors may process personal data. Restrictions can be of two types:

*  **Purposes.** Restrict the purposes for which personal data is processed by a vendor.
*  **Legal basis.** Specify the legal basis upon which a publisher requires a vendor to operate where a vendor has signaled flexibility on legal basis in the [GVL](#the-global-vendor-list).

Publisher restrictions are custom requirements specified by a publisher and must only be saved to a service-specific TC String as part of the _**[Core String](#the-core-string)**_. In order for vendors to determine if processing is permissible at all for a specific purpose or which legal basis is applicable (in case they signaled flexibility in the [GVL](#the-global-vendor-list)) restrictions must be respected.

1. Vendors must always respect a restriction signal that disallows them the processing for a specific purpose regardless of whether or not they have declared that purpose to be “flexible”.
2. Vendors that declared a purpose with a default legal basis (consent or legitimate interest respectively) but also declared this purpose as flexible must respect a legal basis restriction if present. That means for example in case they declared a purpose as legitimate interest but also declared that purpose as flexible and there is a legal basis restriction to require consent, they must then check for the consent signal and must not apply the legitimate interest signal.

For the avoidance of doubt:

In case a vendor has declared flexibility for a purpose and there is no legal basis restriction signal it must always apply the default legal basis under which the purpose was registered aside from being registered as flexible. That means if a vendor declared a purpose as legitimate interest and also declared that purpose as flexible it may not apply a "consent" signal without a legal basis restriction signal to require consent.   


### How does the CMP handle a globally-scoped TC string?

 When configured to use globally-scoped TC Strings CMPs must not overwrite any of the consent or legitimate interest signals found in an existing TC String. Therefore CMPs must do the following:

*   Decode the TC String from the global scope to load and preserve all existing signals
*   Set the signals for the vendors specified in the CMP user interface. If a subset of vendors is shown in the CMP user interface, the CMP must only set signals for those vendors.
*   If a CMP is unable to resolve an ambiguous negative vendor signal – unable to differentiate between a “no” and a “never disclosed” – a CMP shall disambiguate the signal with the corresponding value in the _**[DisclosedVendors ](#disclosed-vendors-oob)**_ segment since that segment signals which vendors were disclosed to the user.
*   Once the user has made their selections the CMP shall save the resulting TC String back to the global context, overwriting the old one.


### How does a vendor retrieve the TC string when it is not participating in a bid request and cannot execute JavaScript?

There are cases when vendors are unable to obtain a TC string via a bid request or using the [CMP API (JavaScript)](https://github.com/InteractiveAdvertisingBureau/GDPR-Transparency-and-Consent-Framework/blob/master/TCFv2/IAB%20Tech%20Lab%20-%20CMP%20API%20v2.md). A vendor may not be integrated with OpenRTB or may participate in an ad-related transaction via a method which cannot execute JavaScript to call the [CMP API](https://github.com/InteractiveAdvertisingBureau/GDPR-Transparency-and-Consent-Framework/blob/master/TCFv2/IAB%20Tech%20Lab%20-%20CMP%20API%20v2.md). The cases are:

*   URL-based ad requests (typically VAST)
*   URL-based creatives
*   URL-based cookie syncing (typically an `<img>` tag)
*   Other URL-based pixels
*   "no script" portions of tags and pixels

For example, `<img src="http://vendor-a.com/key1=val1&key2=val2">` fires an HTTP GET request from the browser to Vendor A’s domain. Since this implementation is an `<img>` tag without the ability to execute JavaScript, the [CMP API](https://github.com/InteractiveAdvertisingBureau/GDPR-Transparency-and-Consent-Framework/blob/master/TCFv2/IAB%20Tech%20Lab%20-%20CMP%20API%20v2.md) cannot be used by the vendor to obtain the TC String. It is clearly not receiving a bid request.

When parties in the ad supply chain cannot retrieve a TC String from an OpenRTB bid request or execute JavaScript to read a TC string from the [CMP API](https://github.com/InteractiveAdvertisingBureau/GDPR-Transparency-and-Consent-Framework/blob/master/TCFv2/IAB%20Tech%20Lab%20-%20CMP%20API%20v2.md) they must add a macro to their URL-based ad requests, URL-based creatives, URL-based cookie syncing pixels and other URL-based pixels, and "no script" portions of tags and pixels. The macro format is `${GDPR_CONSENT_XXXXX}` where `XXXXX` is the numeric Vendor ID of the vendor unable to retrieve the TC string via means other than the macro. The vendor _with_ access to the TC String via OpenRTB or the CMP API who calls the implementation with the macro will expand the macros, including the macro with the value of the TC String. Now the parties in the ad supply chain who cannot retrieve a TC string from OpenRTB or the CMP API can read the value of the expanded macro when their implementation makes an HTTP GET Request.

For example, Vendor A (GVL ID 456) who seeks to receive a TC String value via a URL-based pixel includes this key-value pair with the parameter and macro `gdpr_consent=${GDPR_CONSENT_456}`. The resulting URL before the macro is expanded by the party who calls it is:

`http://vendor-a.com/key1=val1&key2=val2&gdpr_consent=${GDPR_CONSENT_456}`

If the TC String for a transaction is `COvFyGBOvFyGBAbAAAENAPCAAOAAAAAAAAAAAEEUACCKAAA.IFoEUQQgAIQwgIwQABAEAAAAOIAACAIAAAAQAIAgEAACEAAAAAgAQBAAAAAAAGBAAgAAAAAAAFAAECAAAgAAQARAEQAAAAAJAAIAAgAAAYQEAAAQmAgBC3ZAYzUw` the vendor calling Vendor A's URL replaces the macro `${GDPR_CONSENT_456}` with the TC String value. Vendor A's URL will appear as follows when making the HTTP GET request to Vendor A's server.

`http://vendor-a.com/key1=val1&key2=val2&gdpr_consent=COvFyGBOvFyGBAbAAAENAPCAAOAAAAAAAAAAAEEUACCKAAA.IFoEUQQgAIQwgIwQABAEAAAAOIAACAIAAAAQAIAgEAACEAAAAAgAQBAAAAAAAGBAAgAAAAAAAFAAECAAAgAAQARAEQAAAAAJAAIAAgAAAYQEAAAQmAgBC3ZAYzUw`

**Note:** TC Strings must always be propagated as is via macros, never modified. 

**Note:** The above is only an example there are additional implementations requiring macros in the supply chain. Each is addressed the same way.

#### Macro Format, Parameters and Values

The available parameters and macros to relay information through the non-OpenRTB/non-JavaScript excuting supply chain are listed in this section. The basic format of macros is:

```
${MACRO_NAME}
```

**Note:** MACRO_NAME is UPPERCASE. The `${}` and UPPERCASE format can be expected by callers even if their platform's macro format convention is otherwise. The macro format is important to make certain a macro can be recognized and replaced given that vendors using macros are doing so because their implementation has no other way to retreive the TC String value for a given transaction.

The following is a list of all TCF macros:

<table>
  <thead>
    <tr>
      <td><strong>Macro</strong></td>
      <td><strong>possible values</strong></td>
      <td><strong>purpose</strong></td>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>${GDPR}</code></td>
      <td><code>0</code> / <code>1</code></td>
      <td>
        <code>0</code> GDPR does not apply; <code>1</code> GDPR applies. If
        not present, callee should do geoIP lookup, and GDPR applies for EU
        IP addresses
      </td>
    </tr>
    <tr>
      <td><code>${GDPR_CONSENT_XXXXX}</code></td>
      <td>
        URL-safe base64-encoded Transparency & Consent string. Only
        meaningful if <code>gdpr=1</code>
      </td>
      <td>
        Encodes the TC string, as obtained from the CMP JS API or OpenRTB.
      </td>
    </tr>
    <tr>
      <td><code>${GDPR_PD}</code></td>
      <td>
        <code>0</code> / <code>1</code> (optional, default: <code>1</code>)
      </td>
      <td>
        for generic URL parameters, <code>gdpr_pd=0</code> indicates none of
        them contain personal data (from the perspective of the callee). For
        "defined" URL parameters, their definition should define whether
        they include personal data.
      </td>
    </tr>
  </tbody>
</table>

**Note:** other personal data, like IP addresses or callee cookies, may be passed as part of the request, and the `${GDPR}` and `$GDPR_CONSENT_XXXXX` is used by the callee to determine whether an identifier cookie or other personal data can be set and/or used.

##### URL Implementations

When the implementation is in a url, the expected format is:

```
&url_parameter=${MACRO_NAME}
```

The supported URL parameters and the corresponding macros are defined below:

<table>
  <thead>
    <tr>
      <td><strong>URL parameter</strong></td>
      <td><strong>Corresponding Macro</strong></td>
      <td><strong>Representation in URL</strong></td>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>gdpr</code></td>
      <td><code>${GDPR}</code></td>
      <td><code>&gdpr=${GDPR}</code></td>
    </tr>
    <tr>
      <td><code>gdpr_consent</code></td>
      <td>
        <code>${GDPR_CONSENT_XXXXX}</code>
        <p>
          (<code>XXXXX</code> is numeric Vendor ID of the vendor on
          the <a href="#the-global-vendor-list">GVL</a> who is expecting
          this URL call)
        </p>
      </td>
      <td>
        <code>&gdpr_consent=${GDPR_CONSENT_XXXXX}</code>
        <p>
          E.g. <code>&gdpr_consent=${GDPR_CONSENT_123}</code> for Vendor ID
          123.
        </p>
      </td>
    </tr>
    <tr>
      <td><code>gdpr_pd</code></td>
      <td><code>${GDPR_PD}</code></td>
      <td><code>&gdpr_pd=${GDPR_PD}</code></td>
    </tr>
  </tbody>
</table>

The vendor service making the call to a URL with the macro must replace the macros with appropriate values described in the table below. For macro `${GDPR_CONSENT_XXXXX}`, the vendor service making the call to the URL must also check that the macro contains a valid Vendor ID and that the Vendor ID provided has a legal basis for processing personal data _before_ replacing the macro and calling the URL. 

The vendor creating the URL should ensure these parameters are added only once, and are only used with other vendor services which are expecting a macro and can handle one properly. See <a href="#expectations-for-macro-expansion">"Expectations for Macro Expansion"</a> below.

##### Non-URL Implementations

INSERT

#### Expectations for Macro Expansion

Parties in the ad supply chain who cannot retrieve a TC String from an OpenRTB bid request or execute JavaScript to read a TC string from the [CMP API](https://github.com/InteractiveAdvertisingBureau/GDPR-Transparency-and-Consent-Framework/blob/master/TCFv2/IAB%20Tech%20Lab%20-%20CMP%20API%20v2.md) must not rely on other vendors to append URLs with any TCF macros. It is the responsibility of the party who cannot otherwise retreive the TC String value to add the correct macro to their URL-based implementation. Parties who cannot otherwise retreive the TC String value in a given implementation should not rely on ad ops or programmatic mechanisms to appropriately place a TCF macro in a URL-based implementation.

The following table sets expectations about which parties are expected to add and expand a TCF macro in a given use case.

<table>
 <thead>
  <tr>
   <td><strong>Case</strong></td>
   <td><strong>Who adds macro?</strong></td>
   <td><strong>Who expands macro?</strong></td>
  </tr>
 </thead>
 <tbody>
  <tr>
   <td>Ad request URL <strong>via publisher ad server</strong></td>
   <td>Publisher ad server vendor at time of tag export</td>
   <td>INSERT</td>
  </tr>
  <tr>
   <td>Ad request URL <strong>via network</strong></td>
   <td>Publisher ad server vendor at time of tag export</td>
   <td>INSERT</td>
  </tr>
  <tr>
   <td>3rd party creative URL <strong>via DSP</strong></td>
   <td>Creative vendor at time of tag export</td>
   <td>DSP before returning creative URL to page</td>
  </tr>
  <tr>
   <td>3rd party creative URL <strong>via publisher ad server</strong></td>
   <td>Creative vendor at the time of tag export</td>
   <td>Publisher ad server before returning URL to the page</td>
  </tr>
  <tr>
   <td>3rd party creative URL <strong>via header bidding</strong></td>
   <td>Creative vendor at the time of tag export</td>
   <td>DSP before returning URL to the SSP</td>
  </tr>
  <tr>
   <td>3rd party creative URL <strong>via mediation</strong></td>
   <td>Creative vendor at the time of tag export</td>
   <td>Mediating network before returning URL to the SSP</td>
  </tr>
  <tr>
   <td>Hosted creative URL <strong>via DSP</strong></td>
   <td>DSP before returning creative URL to page</td>
   <td>DSP before returning creative URL to page</td>
  </tr>
  <tr>
   <td>Hosted creative URL <strong>via publisher ad server</strong></td>
   <td>Publisher ad server before returning URL to the page</td>
   <td>Publisher ad server before returning URL to the page</td>
  </tr>
  <tr>
   <td>Hosted creative URL <strong>via header bidding</strong></td>
   <td>DSP before returning URL to the SSP</td>
   <td>DSP before returning URL to the SSP</td>
  </tr>
  <tr>
   <td>Cookie Sync URL <strong>via creative</strong></td>
   <td>INSERT</td>
   <td>INSERT</td>
  </tr>
  <tr>
   <td>Cookie Sync URL <strong>via other means</strong></td>
   <td>INSERT</td>
   <td>INSERT</td>
  </tr>
  <tr>
   <td>Pixels added to creatives</td>
   <td>Pixel vendor</td>
   <td>Vendor calling the initial creative URL?</td>
  </tr>
  <tr>
   <td>URL pixels placed on digital properties</td>
   <td>Pixel vendor</td>
   <td>INSERT</td>
  </tr>
  <tr>
   <td>No script portion of tags and pixels that could otherwise use JavaScript</td>
   <td>Tag or pixel vendor</td>
   <td>INSERT</td>
  </tr>
 </tbody>
</table>

#### CMP Redirect for TC String

CMPs can implement a consent redirector and host it at `https://[cmpname].mgr.consensu.org/consent?redirect=url`. This redirector can read the (web-wide global) consent cookie which the browser sends with a 302 HTTP redirect URL using the parameters described in the previous section.

### What if consent is governed differently in a country?

[Policies](https://iabeurope.eu/iab-europe-transparency-consent-framework-policies/) require consent for Purpose 1 to store and/or access information on a device  “where such consent is necessary” leaving the responsibility to publishers and vendors to determine if consent in those jurisdictions is required or not.

 If a publisher is operating a CMP within a jurisdiction that does not require consent to store and/or access information on a device and, therefore, does not ask for consent on behalf of a vendor, the CMP will write the corresponding bit in the _**PurposesConsent**_ field to `0`. Even though it is valid within that jurisdiction to use Legitimate Interest for Purpose 1, a vendor would interpret that `0` as a “no consent” signal and have no way of knowing that consent was not required in the jurisdiction in which the publisher operates.  This lack of transparency would, ultimately, cause losses in ad revenue for that publisher.

To accommodate cases where Purpose 1 is governed differently for consent depending on the jurisdiction, a TC String is transparent about the publisher’s operating governance and whether or not Purpose 1 was disclosed to a user. The vendor can then use these details to make a determination about whether they have sufficient legal bases for personal data processing in that given context. To support this, there are two fields in a TC String: _**PublisherCC**_, which represents the publisher’s country code and a flag for whether any disclosure has been offered on Purpose 1 named _**PurposeOneTreatment**_. Details for each field are listed among [the fields used in the TC String](#tc-string-format).

## Creating a TC String

The following details provide information on creating, storing, and managing a TC String.

### How should a Transparency & Consent String be stored?

In version 1 of the TCF Specifications the consent string was specified to be stored as either a 1st party cookie for service-specific consent or a 3rd party cookie for global consent. In version 2 of the TCF Specifications, the storage mechanism used for service-specific TC Strings is up to a CMP, including any non-cookie storage mechanism. However, global TC Strings must still be stored as cookies under the `consensu.org` domain.

It is important to note that with the creation of the version 2 TCF Specifications globally-scoped and service-specific scoped TC Strings have different encoding and decoding requirements.  Some segments are not allowed in a global scope and some are not allowed in a service-specific scope. This document attempts to call out those differing requirements explicitly where applicable.

The following table summarises where data is stored:

<table>
  <thead>
    <tr>
      <td><strong>Scope</strong></td>
      <td><strong>Storage</strong></td>
      <td><strong>Purpose</strong></td>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Global</td>
      <td>
        3rd-party .consensu.org cookie. CMPs may also “backup” a TC String
        encoded for the global scope via a different storage mechanism if
        3rd-party cookies are being blocked or erased by a browser.
      </td>
      <td>Web-wide vendor transparency & consent</td>
    </tr>
    <tr>
      <td>Service-specific</td>
      <td>
        Storage mechanism chosen by CMP. Must not be stored as the version 1.1
        local ‘euconsent’ cookie.
      </td>
      <td>
        Service-specific vendor transparency & consent (if configured,
        overrides global vendor transparency & consent)
      </td>
    </tr>
  </tbody>
</table>

#### Managing conflicting string versions
Before 30 September 2020, [after which v1.x strings will be considered invalid](https://iabeurope.eu/all-news/the-iab-europe-transparency-consent-framework-tcf-steering-group-votes-to-extend-technical-support-for-tcf-v1-1/), if a CMP encounters a situation where both a v1.x string and a v2.0 string are erroneously present simultaneously, the CMP should remove the v1.x string to ensure that there is only one source of truth for consumers of the string.

**Note:** TCF version 2 introduces [“Publisher Restrictions”](#what-are-publisher-restrictions), which, if exhausted by a publisher, could result in TC strings that are larger than the size limit for cookies.  While this possibility is remote, it should be guarded against – a CMP should work with a publisher to help them accomplish their goals. [Publisher Restrictions](#what-are-publisher-restrictions) are only allowed in TC Strings, therefore within a service-specific context so CMPs may need to take this into consideration when deciding on the storage mechanism for those TC Strings.

### What are the Purposes and Features being supported?

The IAB Europe Transparency & Consent Framework [Policies](https://iabeurope.eu/iab-europe-transparency-consent-framework-policies/) defines Purposes, Special Purposes, Features, Special Features, and Stacks (groupings of Purposes and/or Special Features). You can reference the details of these purposes and features in the document found at the following URL:

[https://iabeurope.eu/iab-europe-transparency-consent-framework-policies/](https://iabeurope.eu/iab-europe-transparency-consent-framework-policies/)


### How should a global TC string be formatted for storage?

The global TC string is stored in a shared space and is formatted as described in the following table:


<table>
  <thead>
    <tr>
      <td><strong>Cookie Directive</strong></td>
      <td><strong>Value(s)</strong></td>
      <td><strong>Notes</strong></td>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Name</td>
      <td><code>euconsent-v2</code></td>
      <td>
        To avoid conflicts with TC String cookie storage, beginning with
        version 2.0 of the TCF the global and service-specific cookie name
        shall include the TC string version as a hyphenated postfix, for
        example <code>euconsent-v2</code>.
      </td>
    </tr>
    <tr>
      <td>Host</td>
      <td><code>.consensu.org</code></td>
      <td>
        The DNS resolution for the name
        <code>[<em>cmp-name</em>].mgr.consensu.org</code> will be delegated
        by the Managing Organisation (IAB Europe) to each CMP. CMPs will
        host their code, APIs, and CDN under this domain or subdomains.
      </td>
    </tr>
    <tr>
      <td>Path</td>
      <td><code>/</code></td>
      <td></td>
    </tr>
    <tr>
      <td>Max-Age</td>
      <td><code>33696000</code></td>
      <td>This represents thirteen 30-day months.</td>
    </tr>
    <tr>
      <td>Value</td>
      <td>Encoded TC String</td>
      <td></td>
    </tr>
  </tbody>
</table>


#### Global Cookie Storage Update (December 2019)
- All requests that read from or write to the global cookie in the consensu.org domain must be secured by HTTPS
- Additionally, browser cookie policies may require the support of certain attributes (e.g. sameSite, Secure)



### TC String Format

There are 4 distinct TC String segments that are joined together on a “dot” character.  They are:

*   The core vendor transparency and consent details
*   Disclosed vendors for validating OOB signaling
*   Allowed vendors for restricting OOB signaling to select vendors, and
*   Publisher purposes transparency and consent for their own data uses.

The _**[Core String](#the-core-string)**_ is always required and comes first and includes all the details required for communicating basic vendor transparency and consent. The remaining optional and arbitrarily ordered segments represent support for [out-of-band (OOB)](#signaling-oob-in-the-tc-string) signaling and [publisher purposes transparency and consent (publisher TC)](#publisher-purposes-transparency-and-consent).  A TC String with all four segments is possible in certain conditions.

For example, a globally-scoped TC String with all four segments present would be surfaced through CMP API – not stored – and look like:

[ _**[Core String](#the-core-string)**_ ].[ _**[Disclosed Vendors](#disclosed-vendors-oob)**_ ].[ _**[AllowedVendors](#allowed-vendors-oob)**_ ].[ _**[Publisher TC](#publisher-purposes-transparency-and-consent)**_ ]

```
COw4XqLOw4XqLAAAAAENAXCAAAAAAAAAAAAAAAAAAAAA.IFukWSQgAIQwgI0QEByFAAAAeIAACAIgSAAQAIAgEQACEABAAAgAQFAEAIAAAGBAAgAAAAQAIFAAMCQAAgAAQiRAEQAAAAANAAIAAggAIYQFAAARmggBC3ZCYzU2yIA.QFukWSQgAIQwgI0QEByFAAAAeIAACAIgSAAQAIAgEQACEABAAAgAQFAEAIAAAGBAAgAAAAQAIFAAMCQAAgAAQiRAEQAAAAANAAIAAggAIYQFAAARmggBC3ZCYzU2yIA.YAAAAAAAAAAAAAAAAAA
```
A service-specific TC String must contain a Core TC String and may optionally contain a _**[Publisher TC](#publisher-purposes-transparency-and-consent)**_ segment, but must not contain the OOB-related segments because those segments are not allowed in service-specific contexts:

[ _**[Core String](#the-core-string)**_ ].[ _**[Publisher TC](#publisher-purposes-transparency-and-consent)**_ ]

```
CLcVDxRMWfGmWAVAHCENAXCkAKDAADnAABRgA5mdfCKZuYJez-NQm0TBMYA4oCAAGQYIAAAAAAEAIAEgAA.argAC0gAAAAAAAAAAAA
```

 #### The Core String

 The following fields are stored in big-endian format. Bit numberings are left-to-right.

<table>
  <thead>
    <tr style="background-color:#000;color:#FFF;">
      <td><strong>Field Name</strong></td>
      <td><strong>Bits</strong></td>
      <td><strong>Value(s)</strong></td>
      <td><strong>Notes</strong></td>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Version</td>
      <td>6 bits</td>
      <td>Version number of the encoding format</td>
      <td>the value is 2 for this format.</td>
    </tr>
    <tr>
      <td>Created</td>
      <td>36 bits</td>
      <td>
        Epoch deciseconds when this TC String was first created (should not
        be changed unless a new TCString is created from scratch)
      </td>
      <td rowspan="2">
        A decisecond is 1/10th of a second. To create a decisecond timestamp
        in JavaScript: <code>Math.round((new Date()).getTime()/100)</code>
      </td>
    </tr>
    <tr>
      <td>LastUpdated</td>
      <td>36 bits</td>
      <td>
        Epoch deciseconds when TC String was last updated (Must be updated
        any time a value is changed)
      </td>
    </tr>
    <tr>
      <td>CmpId</td>
      <td>12 bits</td>
      <td>
        Consent Management Platform ID that last updated the TC String
      </td>
      <td>
        A unique ID will be assigned to each Consent Management Platform.
      </td>
    </tr>
    <tr>
      <td>CmpVersion</td>
      <td>12 bits</td>
      <td>
        Consent Management Platform version of the CMP that last updated
        this TC String
      </td>
      <td>
        Each change to a CMP should increment their internally assigned
        version number as a record of which version the user gave consent
        and transparency was established.
      </td>
    </tr>
    <tr>
      <td>ConsentScreen</td>
      <td>6 bits</td>
      <td>
        CMP Screen number at which consent was given for a user with the CMP
        that last updated this TC String
      </td>
      <td>
        The number is a CMP internal designation and is CmpVersion specific.
        The number is used for identifying on which screen a user gave
        consent as a record.
      </td>
    </tr>
    <tr>
      <td>ConsentLanguage</td>
      <td>12 bits</td>
      <td>
        Two-letter
        <a href="https://en.wikipedia.org/wiki/ISO_639-1">ISO 639-1</a>
        language code in which the CMP UI was presented
      </td>
      <td>Each letter is encoded as 6 bits, a=0..z=25.</td>
    </tr>
    <tr>
      <td>VendorListVersion</td>
      <td>12 bits</td>
      <td>
        Number corresponds to <a href="#the-global-vendor-list">GVL</a>
        <code>vendorListVersion</code>
      </td>
      <td>
        Version of the <a href="#the-global-vendor-list">GVL</a> used to
        create this TC String.
      </td>
    </tr>
    <tr>
      <td>TcfPolicyVersion</td>
      <td>6 bits</td>
      <td>
        Version of policy used within
        <a href="#the-global-vendor-list">GVL</a>
      </td>
      <td>
        From the corresponding field in the
        <a href="#the-global-vendor-list">GVL</a> that was used for
        obtaining consent. A new policy version invalidates existing strings
        and requires CMPs to re-establish transparency and consent from
        users.
      </td>
    </tr>
    <tr>
      <td>IsServiceSpecific</td>
      <td>1 bit</td>
      <td><code>1</code> true<br /><code>0</code> false</td>
      <td>
        Whether the signals encoded in this TC String were from
        service-specific storage (<code>true</code>) versus ‘global’
        consensu.org shared storage (<code>false</code>).
      </td>
    </tr>
    <tr>
      <td>UseNonStandardStacks</td>
      <td>1 bit</td>
      <td>
        <code>1</code> CMP used non-IAB standard stacks during consent
        gathering<br /><code>0</code> IAB standard stacks were used
      </td>
      <td>
        Setting this to 1 means that a publisher-run CMP – that is still IAB
        Europe registered – is using customized Stack descriptions and not
        the standard stack descriptions defined in the
        <a
          href="https://iabeurope.eu/iab-europe-transparency-consent-framework-policies/"
          >Policies</a
        >
        (Appendix A section E). A CMP that services multiple publishers sets
        this value to <code>0</code>.
      </td>
    </tr>
    <tr>
      <td>SpecialFeatureOptIns</td>
      <td>12 bits</td>
      <td>
        One bit for each Special Feature:<br /><br /><code>1</code> Opted
        in<br /><code>0</code> Not opted in
      </td>
      <td>
        The TCF
        <a
          href="https://iabeurope.eu/iab-europe-transparency-consent-framework-policies/"
          >Policies</a
        >
        designates certain Features as “special” which means a CMP must
        afford the user a means to opt in to their use. These “Special
        Features” are published and numerically identified in the
        <a href="#the-global-vendor-list">Global Vendor List</a> separately
        from normal Features.
      </td>
    </tr>
    <tr>
      <td>
        PurposesConsent
        <p>
          (renamed from PurposesAllowed)
        </p>
      </td>
      <td>24 bits</td>
      <td>
        One bit for each Purpose:<br /><br /><code>1</code>
        Consent<br /><code>0</code> No Consent
      </td>
      <td>
        The user’s consent value for each Purpose established on the legal
        basis of consent.<br /><br />The Purposes are numerically identified
        and published in the
        <a href="#the-global-vendor-list">Global Vendor List</a>. From left
        to right, Purpose 1 maps to the <code>0</code>th bit, purpose 24
        maps to the bit at index 23. Special Purposes are a different ID
        space and not included in this field.
      </td>
    </tr>
    <tr>
      <td>PurposesLITransparency</td>
      <td>24 bits</td>
      <td>
        One bit for each Purpose:<br /><code>1</code> legitimate interest
        established<br /><br /><code>0</code> legitimate interest was
        <u><strong>NOT</strong></u> established or it was established but
        user exercised their “Right to Object” to the Purpose
      </td>
      <td>
        The Purpose’s transparency requirements are met for each Purpose on
        the legal basis of legitimate interest and the user has not
        exercised their “Right to Object” to that Purpose.
        <p>
          By default or if the user has exercised their “Right to Object” to
          a Purpose, the corresponding bit for that Purpose is set to
          <code>0</code>. From left to right, Purpose 1 maps to the 0th bit,
          purpose 24 maps to the bit at index 23. Special Purposes are a
          different ID space and not included in this field.
        </p>
      </td>
    </tr>
    <tr style="background-color:#000;color:#FFF;">
      <td colspan="4">
        <strong>Specific Jurisdiction Disclosures</strong>
      </td>
    </tr>
    <tr>
      <td>PurposeOneTreatment</td>
      <td>1 bit</td>
      <td>
        <code>1</code> Purpose 1 was NOT disclosed at all.<br /><br /><code
          >0</code
        >
        Purpose 1 was disclosed commonly as consent as expected by the
        <a
          href="https://iabeurope.eu/iab-europe-transparency-consent-framework-policies/"
          >Policies</a
        >.
      </td>
      <td>
        CMPs can use the PublisherCC field to indicate the legal
        jurisdiction the publisher is under to help vendors determine
        whether the vendor needs consent for Purpose 1.
        <p>
          In a globally-scoped TC string, this field must always have a
          value of 0. When a CMP encounters a globally-scoped TC String with
          PurposeOneTreatment=1 then it is considered invalid and the CMP
          must discard it and re-establish transparency and consent.
        </p>
      </td>
    </tr>
    <tr>
      <td>PublisherCC</td>
      <td>12 bits</td>
      <td>
        <a href="https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2"
          >ISO 3166-1 alpha-2 code</a
        >
      </td>
      <td>
        The country code of the country that determines legislation of
        reference. Commonly, this corresponds to the country in which the
        publisher’s business entity is established.
        <p>
          Each letter is encoded as 6 bits, a=0..z=25.
        </p>
      </td>
    </tr>
    <tr style="background-color:#000;color:#FFF;">
      <td colspan="4"><strong>Vendor Consent Section</strong></td>
    </tr>
    <tr>
      <td>MaxVendorId</td>
      <td>16 bits</td>
      <td>
        The maximum Vendor ID that is represented in the following bit field
        or range encoding.
      </td>
      <td>
        Because this section can be a variable length, this indicates the
        last ID of the section so that a decoder will know when it has
        reached the end.
      </td>
    </tr>
    <tr>
      <td>IsRangeEncoding</td>
      <td>1 bit</td>
      <td>
        <code>1</code> Range<br />
        <code>0</code> BitField
      </td>
      <td>
        The encoding scheme used to encode the IDs in the section – Either a
        BitField Section or Range Section follows. Encoding logic should
        choose the encoding scheme that results in the smaller output size
        for a given set.
      </td>
    </tr>
    <tr style="background-color:#999;">
      <td colspan="2"><strong>BitField Section</strong></td>
      <td colspan="2">
        <strong>Encodes one consent bit per Vendor ID</strong>
      </td>
    </tr>
    <tr>
      <td>BitField</td>
      <td>MaxVendorId bits</td>
      <td>
        One bit for each Vendor:<br /><br /><code>1</code>
        Consent<br /><code>0</code> No Consent
      </td>
      <td>
        The consent value for each Vendor ID from <code>1</code> to
        MaxVendorId where index <code>0</code> is Vendor ID
        <code>1</code>.<br /><br />Set the bit corresponding to a given
        vendor to <code>1</code> if the user has consented to this vendor
        processing their personal data
      </td>
    </tr>
    <tr style="background-color:#999;">
      <td><strong>Range Section</strong></td>
      <td></td>
      <td></td>
      <td>
        <strong
          >Encodes range groups of Vendor IDs who have received consent from
          a user</strong
        >
      </td>
    </tr>
    <tr>
      <td>NumEntries</td>
      <td>12 bits</td>
      <td colspan="2">Number of RangeEntry sections to follow</td>
    </tr>
    <tr style="border-top:5px solid black;">
      <td colspan="2">RangeEntry (repeated NumEntries times)</td>
      <td colspan="2">
        A single or range of Vendor ID(s) who have received consent. If a
        Vendor ID is not within the bounds of the ranges then the vendor is
        assumed to have “No Consent”.
      </td>
    </tr>
    <tr>
      <td>IsARange</td>
      <td>1 bit</td>
      <td>
        <code>1</code> Vendor ID range<br />
        <code>0</code> Single Vendor ID
      </td>
      <td>
        If more than one Vendor ID is included in this RangeEntry then this
        describes a range of Vendor IDs and this value is 1. If only one
        Vendor ID is included then the value is 0.
      </td>
    </tr>
    <tr>
      <td>StartOrOnlyVendorId</td>
      <td>16 bits</td>
      <td>
        The first ID of an inclusive contiguous ascending-order series of
        Vendor IDs even if the series is only a cardinality of 1.
      </td>
      <td>
        This is the first or only Vendor ID with consent in this RangeEntry.
      </td>
    </tr>
    <tr>
      <td>EndVendorId</td>
      <td>16 bits</td>
      <td>
        The last ID of the inclusive contiguous ascending-order series of
        Vendor IDs started with StartOrOnlyVendorId but only if that series
        has a cardinality greater than 1, otherwise this field is omitted.
      </td>
      <td>
        The end of the series of Vendor IDs – this is omitted if
        <code>IsARange=0</code>.
      </td>
    </tr>
    <tr style="border-bottom:5px solid black;border-top:2px solid #999;">
      <td colspan="4">
        <strong>Repeated RangeEntry sections to NumEntries...</strong>
      </td>
    </tr>
    <tr style="background-color:#000;color:#FFF;">
      <td colspan="4">
        <strong>Vendor Legitimate Interest Section</strong>
      </td>
    </tr>
    <tr>
      <td>MaxVendorId</td>
      <td>16 bits</td>
      <td>
        The maximum Vendor ID that is represented in the following bit field
        or range encoding.
      </td>
      <td>
        Because this section can be a variable length, this indicates the
        last ID of the section so that a decoder will know when it has
        reached the end.
      </td>
    </tr>
    <tr>
      <td>IsRangeEncoding</td>
      <td>1 bit</td>
      <td>
        <code>1</code> Range<br />
        <code>0</code> BitField
      </td>
      <td>
        The encoding scheme used to encode the IDs in the section – Either a
        BitField Section or Range Section follows. Encoding logic should
        encode with the encoding scheme that results in the smaller output
        size for a given set.
      </td>
    </tr>
    <tr style="background-color:#999;">
      <td colspan="2"><strong>BitField Section</strong></td>
      <td colspan="2">
        <strong>Encodes one legitimate interest bit per Vendor ID</strong>
      </td>
    </tr>
    <tr>
      <td>BitField</td>
      <td>MaxVendorId bits</td>
      <td>
        <p>One bit for each Vendor:</p>
        <p>
          <code>1</code> Legitimate Interest established<br /><code>0</code>
          Legitimate Interest not established or the user exercised their
          “Right to Object”
        </p>
      </td>
      <td>
        The legitimate interest value for each Vendor ID from
        <code>1</code> to MaxVendorId where index <code>0</code> is Vendor
        ID <code>1</code>.
        <p>
          Set the bit corresponding to a given vendor to <code>1</code> if
          the CMP has established transparency for that vendor's legitimate
          interest disclosures for one or more Purposes (including Special Purposes).
        </p>
        <p>
          If a user exercises their “Right To Object” to a vendor’s
          processing based on a legitimate interest, then that vendor’s bit
          must be set to <code>0</code>. For vendors that register for Special
          Purposes only (no other Purposes) and have been displayed by
          the CMP the value must be set to <code>1</code>. Note:
          Special Purposes are displayed for transparency only and do not
          enable user choice.
        </p>
      </td>
    </tr>
    <tr style="background-color:#999;">
      <td colspan="2"><strong>Range Section</strong></td>
      <td colspan="2">
        <strong
          >Encodes range groups of Vendor IDs who have established their
          legitimate interest disclosures with a user</strong
        >
      </td>
    </tr>
    <tr>
      <td>NumEntries</td>
      <td>12 bits</td>
      <td colspan="2">Number of RangeEntry sections to follow</td>
    </tr>
    <tr style="border-top:5px solid black;">
      <td colspan="2">RangeEntry (repeated NumEntries times)</td>
      <td colspan="2">
        A single or range of Vendor ID(s) who have established transparency
        for their legitimate interest disclosures with the user. If a Vendor
        ID is not within the bounds of the ranges then they have not
        established that transparency.
      </td>
    </tr>
    <tr>
      <td>IsARange</td>
      <td>1 bit</td>
      <td>
        <code>1</code> Vendor ID range<br />
        <code>0</code> Single Vendor ID
      </td>
      <td>
        If more than one Vendor ID is included in this RangeEntry then this
        describes a range of Vendor IDs and this value is <code>1</code>. If
        only one Vendor ID is included then the value is <code>0</code>.
      </td>
    </tr>
    <tr>
      <td>StartOrOnlyVendorId</td>
      <td>16 bits</td>
      <td>
        The first ID of an inclusive contiguous ascending-order series of
        Vendor IDs even if the series is only a cardinality of 1.
      </td>
      <td>
        This is the first or only Vendor ID with legitimate interest
        disclosures established in this RangeEntry.
      </td>
    </tr>
    <tr>
      <td>EndVendorId</td>
      <td>16 bits</td>
      <td>
        The last ID of the inclusive contiguous ascending-order series of
        Vendor IDs started with StartOrOnlyVendorId but only if that series
        has a cardinality greater than <code>1</code>, otherwise this field
        is omitted.
      </td>
      <td>
        The end of the series of Vendor IDs – this is omitted if
        <code>IsARange=0</code>.
      </td>
    </tr>
    <tr style="border-bottom:5px solid black;border-top:2px solid #999;">
      <td colspan="4">
        <strong>Repeated RangeEntry sections to NumEntries...</strong>
      </td>
    </tr>
    <tr style="background-color:#000;color:#FFF;">
      <td><strong>Publisher Restrictions Section</strong></td>
      <td colspan="3">
        <strong
          >The content of this section is optional EXCEPT for
          NumPubRestrictions. Encodes any number of single or range
          restriction entries</strong
        >
      </td>
    </tr>
    <tr>
      <td>NumPubRestrictions</td>
      <td>12 bits</td>
      <td colspan="2">
        Number of restriction records to follow.<br /><br /><strong
          style="color:red;"
          >Value is required</strong
        >
        even if it is <code>0</code>
      </td>
    </tr>
    <tr style="border-top:5px solid black;">
      <td colspan="3">
        PubRestrictionEntry (Repeated NumPubRestrictions times)
      </td>
      <td>
        Each Publisher Restriction Entry is made up of three parts: Purpose
        ID, Restriction Type and, List of Vendor IDs under that Purpose
        restriction.
      </td>
    </tr>
    <tr>
      <td>PurposeId</td>
      <td>6 bits</td>
      <td>Purpose ID</td>
      <td>
        The Vendor’s declared Purpose ID that the publisher has indicated
        that they are overriding.
      </td>
    </tr>
    <tr>
      <td>RestrictionType</td>
      <td>2 bits</td>
      <td>
        <p>
          Enum
        </p>
        <p>
          <code>0</code> Purpose Flatly Not Allowed by Publisher (regardless
          of Vendor declarations)
        </p>
        <p>
          <code>1</code> Require Consent (if Vendor has declared the Purpose
          IDs legal basis as Legitimate Interest and flexible)
        </p>
        <p>
          <code>2</code> Require Legitimate Interest (if Vendor has declared
          the Purpose IDs legal basis as Consent and flexible)
        </p>
        <p><code>3</code> UNDEFINED (not used)</p>
      </td>
      <td>
        <p>Vendors must always respect a <code>0</code> (Not Allowed)
        regardless of whether or not they have not declared that Purpose to
        be “flexible”. Values <code>1</code> and <code>2</code> are in
        accordance with a vendor's declared flexibility. Eg. if a vendor has
        Purpose 2 declared as Legitimate Interest but also declares that
        Purpose as flexible and this field is set to <code>1</code>, they
        must then check for the “consent” signal in the VendorConsents
        section to make a determination on whether they have the legal basis
        for processing user personal data under that Purpose.</p>
        <p>When a vendor's Purpose registration <strong><em>is not flexible</em></strong> 
        they should interpret this value in the following ways:</strong></p>
        <p>If this value is <code>1</code> and vendor is registered under 
        Legitimate Interest for that Purpose then the vendor <em>should not 
        process</em> for that Purpose.</p>
        <p>If this value is <code>1</code> and vendor is registered under Consent
        for that Purpose then the vendor <em>can ignore</em> the signal.</p>
        <p>If this value is <code>2</code> and vendor is registered under Consent 
        for that Purpose then the vendor <em>should not process</em> for that Purpose.</p>
        <p>If this value is <code>2</code> and vendor is registered under 
        Legitimate Interest for that Purpose then the vendor <em>can ignore</em> the signal.</p>
        <p>If this value is <code>1</code> or <code>2</code> and the vendor is not
        registered for the Purpose then the vendor <em>should not process</em> for that Purpose.</p>
        <p>
          <strong>Note:</strong> Purpose 1 is always required to be
          registered as a consent purpose and can not be flexible per
          <a
            href="https://iabeurope.eu/iab-europe-transparency-consent-framework-policies/"
            >Policies</a
          >.
        </p>
      </td>
    </tr>
    <tr style="border-top:2px solid black;">
      <td>NumEntries</td>
      <td>12 bits</td>
      <td colspan="2">Number of RangeEntry sections to follow.</td>
    </tr>
    <tr style="border-top:5px double black;">
      <td colspan="2">RangeEntry (repeated NumEntries times)</td>
      <td colspan="2">
        A single or range of Vendor ID(s) who the publisher has designated
        as restricted under the Purpose ID in this PubRestrictionsEntry.
      </td>
    </tr>
    <tr>
      <td>
        IsARange
      </td>
      <td>1 bit</td>
      <td>
        <code>1</code> Vendor ID range<br />
        <code>0</code> Single Vendor ID
      </td>
      <td>
        If more than one Vendor ID is included in this RangeEntry then this
        describes a range of Vendor IDs and this value is <code>1</code>. If
        only one Vendor ID is included then the value is <code>0</code>.
      </td>
    </tr>
    <tr>
      <td>
        StartOrOnlyVendorId
      </td>
      <td>16 bits</td>
      <td>
        The first ID of an inclusive contiguous ascending-order series of
        Vendor IDs even if the series is only a cardinality of 1.
      </td>
      <td>
        This is the first or only Vendor ID with this restriction in this
        RangeEntry
      </td>
    </tr>
    <tr>
      <td>EndVendorId</td>
      <td>16 bits</td>
      <td>
        The last ID of the inclusive contiguous ascending-order series of
        Vendor IDs started with StartOrOnlyVendorId but only if that series
        has a cardinality greater than 1, otherwise this field is omitted. Note that <em>contiguous</em> above permits encoding ranges that include deleted Vendors or cover gaps in GVL vendor IDs unlike other range encodings in this specification. For example, to encode a restriction for vendors [12, 15, 18, 24] if vendor IDs 13-14, 16-17, and 19-22 are not in the GVL and 23 is in the GVL but has a non-empty <code>deletedDate</code>, a range entry of 12-24 is permitted.
      </td>
      <td>
        The end of the series of Vendor IDs – this is omitted if
        <code>IsARange=0</code>.
      </td>
    </tr>
    <tr style="border-bottom:5px double black;border-top:2px solid #999;">
      <td colspan="4">
        <strong>Repeated RangeEntry sections to NumEntries...</strong>
      </td>
    </tr>
    <tr style="border-bottom:5px solid black;">
      <td colspan="4">
        <strong>Repeated PubRestrictionsEntry sections to NumPubRestrictions...</strong>
      </td>
    </tr>
  </tbody>
</table>



#### Signaling OOB in the TC String

On occasion, legal bases for processing a user's personal data are achieved outside of the TCF. This would be considered an out-of-band (OOB) legal basis. To signal whether using an OOB legal bases is allowed requires:

*   An indication that some CMP has, at some time, disclosed the vendor in a global context to the user in the _**[DisclosedVendors](#disclosed-vendors-oob)**_ segment
*   The use of a global-context TC String
*   The publisher to allow vendors, in general, to use OOB legal bases
*   Optionally, a list of specific vendors allowed to use OOB legal bases in the _**[AllowedVendors](#allowed-vendors-oob)**_ segment

The _**[DisclosedVendors](#disclosed-vendors-oob)**_ segment of a TC String provides a list of vendors that have been disclosed to a user; it is created and stored in a global context for all CMPs to share across the web. The existence of this segment as a member of a TC String, when signaling, implies that the publisher supports OOB legal bases. Conversely, If a publisher does not support OOB legal bases the segment shall be omitted when signaling.  Regardless of publisher support, a CMP shall still update the segment with any new Vendor IDs disclosed and save the updated TC String back to the global context when the CMP user interface completes its interaction with the user.

If a publisher supports OOB legal bases, but only for select vendors, a CMP shall create an _**[AllowedVendors](#allowed-vendors-oob)**_ segment that reflects the vendors the publisher allows to operate under OOB legal bases.  When a TC String is requested from the CMP API it shall include both the _**[AllowedVendors](#allowed-vendors-oob)**_ and _**[DisclosedVendors](#disclosed-vendors-oob)**_ segments.  However, when a TC String is stored, an _**[AllowedVendors](#allowed-vendors-oob)**_ segment must never be saved to the global context as this is a publisher-specific setting and does not apply web-wide. If a CMP encounters a TC String with an _**[AllowedVendors](#allowed-vendors-oob)**_ segment in the global context it must disregard it, not include it in responses from the CMP API, and of course omit it when re-saving.

**Note:** If a Vendor has been _disclosed_ within the _**[DisclosedVendors](#disclosed-vendors-oob)**_ segment that means that they have interacted with the Framework and therefore can not use OOB legal bases.

The following three examples demonstrate how to handle an OOB signal in the TC String.

**Example 1: A Publisher Does <span style="text-decoration:underline;">Not</span> Support OOB Legal Bases**

The CMP reads a TC String from global context storage and it contains a _**[DisclosedVendors](#disclosed-vendors-oob)**_ segment:

[ _**[Core](#the-core-string)**_ ].[ _**[DisclosedVendors](#disclosed-vendors-oob)**_ ]
```
COvFyGBOvFyGBAbAAAENAPCAAOAAAAAAAAAAAEEUACCKAAA.IFoEUQQgAIQwgIwQABAEAAAAOIAACAIAAAAQAIAgEAACEAAAAAgAQBAAAAAAAGBAAgAAAAAAAFAAECAAAgAAQARAEQAAAAAJAAIAAgAAAYQEAAAQmAgBC3ZAYzUw
```
Because the publisher does not support OOB legal bases, the dot-delimited _**[DisclosedVendors](#disclosed-vendors-oob)**_ segment at the end of the TC String is removed when requested from the CMP API:

[ _**[Core](#the-core-string)**_ ]
```
COvFyGBOvFyGBAbAAAENAPCAAOAAAAAAAAAAAEEUACCKAAA
```

**Example 2: A Publisher Supports OOB Legal Bases**

The CMP reads a TC String from global context storage and it contains a _**[DisclosedVendors](#disclosed-vendors-oob)**_ segment (same as Example 1):

[ _**[Core](#the-core-string)**_ ].[ _**[DisclosedVendors](#disclosed-vendors-oob)**_ ]
```
COvFyGBOvFyGBAbAAAENAPCAAOAAAAAAAAAAAEEUACCKAAA.IFoEUQQgAIQwgIwQABAEAAAAOIAACAIAAAAQAIAgEAACEAAAAAgAQBAAAAAAAGBAAgAAAAAAAFAAECAAAgAAQARAEQAAAAAJAAIAAgAAAYQEAAAQmAgBC3ZAYzUw
```
Since the publisher supports OOB legal bases for any vendor that uses it, the TC String, when surfaced through the CMP API, is unchanged from storage – it includes the _**[DisclosedVendors](#disclosed-vendors-oob)**_ segment:

[ _**[Core](#the-core-string)**_ ].[ _**[DisclosedVendors](#disclosed-vendors-oob)**_ ]
```
COvFyGBOvFyGBAbAAAENAPCAAOAAAAAAAAAAAEEUACCKAAA.IFoEUQQgAIQwgIwQABAEAAAAOIAACAIAAAAQAIAgEAACEAAAAAgAQBAAAAAAAGBAAgAAAAAAAFAAECAAAgAAQARAEQAAAAAJAAIAAgAAAYQEAAAQmAgBC3ZAYzUw
```

**Example 3: A Publisher Supports OOB Legal Bases for Only Select Vendors**

The CMP reads a TC String from global context storage and it contains a _**[DisclosedVendors](#disclosed-vendors-oob)**_ segment (same as Example 1 & Example 2):


[ _**[Core](#the-core-string)**_ ].[ _**[DisclosedVendors](#disclosed-vendors-oob)**_ ]
```
COvFyGBOvFyGBAbAAAENAPCAAOAAAAAAAAAAAEEUACCKAAA.IFoEUQQgAIQwgIwQABAEAAAAOIAACAIAAAAQAIAgEAACEAAAAAgAQBAAAAAAAGBAAgAAAAAAAFAAECAAAgAAQARAEQAAAAAJAAIAAgAAAYQEAAAQmAgBC3ZAYzUw.PVAfDObdrA
```

To indicate the select vendors a publisher approves to use OOB legal bases, the CMP includes the _**[AllowedVendors](#allowed-vendors-oob)**_ segment with the TC String from the CMP API:

[ _**[Core](#the-core-string)**_ ].[ _**[DisclosedVendors](#disclosed-vendors-oob)**_ ].[ _**[AllowedVendors](#allowed-vendors-oob)**_ ]

```
CGL23UdMFJzvuA9ACCENAXCEAC0AAGrAAA5YA5ht7-_d_7_vd-f-nrf4_4A4hM4JCKoK4YhmAqABgAEgAA.IFut_a83_Ma_t-_SvB3v4-IAeIAACAIgSAAQAIAgEQACEABAAAgAQFAEAIAAAGBAAgAAAAQAIFAAMCQAAgAAQiRAEQAAAAANAAIAAggAIYQFAAARmggBC3ZCYzU2yIA.QFulWfTw4obx_Z2zUj6XkNIAeIAACAIgSAAQAIAgEQACEABAAAgAQFAEAIAAAGBAAgAAAAQAIFAAMCQAAgAAQiRAEQAAAAANAAIAAggAIYQFAAARmggBC3ZCYzU2yIA
```

#### Disclosed Vendors (OOB)

The _**DisclosedVendors**_ is a TC String segment that signals which vendors have been disclosed to a given user by a CMP. This segment is required when saving a global-context TC String.  When a CMP updates a globally-scoped TC String, the CMP <span style="text-decoration:underline;">MUST</span> retain the existing values and only add new disclosed Vendor IDs that had not been added by other CMPs in prior interactions with this user.


<table>
  <thead>
    <tr style="background-color:#000;color:#FFF;">
      <td><strong>Field Name</strong></td>
      <td><strong>Bits</strong></td>
      <td><strong>Values</strong></td>
      <td><strong>Description</strong></td>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>SegmentType</td>
      <td>3 bits</td>
      <td>
        <p>
          Enum
        </p>
        <p><code>0</code> Default (<em>Core</em>)</p>
        <p>
          <strong><code>1</code> <em>DisclosedVendors</em></strong>
        </p>
        <p><code>2</code> <em>AllowedVendors</em></p>
        <p><code>3</code> PublisherTC</p>
      </td>
      <td>
        <strong><em>DisclosedVendors</em></strong> segment is
        <code>1</code> which is <code>001</code> in binary.
      </td>
    </tr>
    <tr>
      <td>MaxVendorId</td>
      <td>16 bits</td>
      <td>The maximum Vendor ID included in this encoding.</td>
      <td>
        Because this section can be a variable length, this indicates the
        last ID of the section so that a decoder will know when it has
        reached the end.
      </td>
    </tr>
    <tr>
      <td>IsRangeEncoding</td>
      <td>1 bit</td>
      <td>
        <code>1</code> Range<br />
        <code>0</code> BitField
      </td>
      <td>
        The encoding scheme used to encode the IDs in the section – Either a
        BitField Section or Range Section follows. Encoding logic should
        choose the encoding scheme that results in the smaller output size
        for a given set.
      </td>
    </tr>
    <tr></tr>
    <tr style="background-color:#999;">
      <td colspan="2"><strong>BitField Section</strong></td>
      <td colspan="2">
        <strong>Encodes one disclosed vendor bit per Vendor ID</strong>
      </td>
    </tr>
    <tr>
      <td>BitField</td>
      <td>MaxVendorId bits</td>
      <td>
        <p>
          One bit for each vendor
        </p>
        <p>
          <code>1</code> Disclosed<br />
          <code>0</code> Not Disclosed
        </p>
      </td>
      <td>
        The value for each Vendor ID from <code>1</code> to MaxVendorId.
        <p>
          Set the bit corresponding to a given vendor to <code>1</code> if
          the CMP has disclosed the vendor in the UI.
        </p>
      </td>
    </tr>
    <tr style="background-color:#999;">
      <td colspan="2"><strong>Range Section</strong></td>
      <td colspan="2">
        <strong>Encodes range groups of Vendor IDs who have been disclosed to a
          user</strong>
      </td>
    </tr>
    <tr>
      <td>NumEntries</td>
      <td>12 bits</td>
      <td colspan="2">Number of RangeEntry sections to follow</td>
    </tr>
    <tr style="border-top:5px solid black;">
      <td colspan="2">RangeEntry (repeated NumEntries times)</td>
      <td colspan="2">
        A single or range of Vendor ID(s) of Vendor(s) who were disclosed in
        a CMP UI to the user. If a Vendor ID is not within the bounds of the
        ranges then they were not disclosed to the user.
      </td>
    </tr>
    <tr>
      <td>IsARange</td>
      <td>1 bit</td>
      <td>
        <code>1</code> Vendor ID range<br />
        <code>0</code> Single Vendor ID
      </td>
      <td>
        If more than one Vendor ID is included in this RangeEntry then this
        describes a range of Vendor IDs and this value is 1. If only one
        Vendor ID is included then the value is <code>0</code>.
      </td>
    </tr>
    <tr>
      <td>StartOrOnlyVendorId</td>
      <td>16 bits</td>
      <td>
        The first ID of an inclusive contiguous ascending-order series of
        Vendor IDs even if the series is only a cardinality of 1.
      </td>
      <td>
        This is the first or only Vendor ID that has been disclosed in this
        RangeEntry.
      </td>
    </tr>
    <tr>
      <td>EndVendorId</td>
      <td>16 bits</td>
      <td>
        The last ID of the inclusive contiguous ascending-order series of
        Vendor IDs started with StartOrOnlyVendorId but only if that series
        has a cardinality greater than 1, otherwise this field is omitted.
      </td>
      <td>
        The end of the series of Vendor IDs – this is omitted if
        <code>IsARange=0</code>.
      </td>
    </tr>
  </tbody>
</table>

#### Allowed Vendors (OOB)

Signals which vendors the publisher permits to use OOB legal bases.

<table>
  <thead>
    <tr style="background-color:#000;color:#FFF;">
      <td><strong>Field Name</strong></td>
      <td><strong>Bits</strong></td>
      <td><strong>Values</strong></td>
      <td><strong>Description</strong></td>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>SegmentType</td>
      <td>3 bits</td>
      <td>
        <p>
          Enum
        </p>
        <p><code>0</code> Default (<em>Core</em>)</p>
        <p><code>1</code> <em>DisclosedVendors</em></p>
        <p>
          <strong><code>2</code> <em>AllowedVendors</em></strong>
        </p>
        <p><code>3</code> PublisherTC</p>
      </td>
      <td>
        OOB AllowedVendors segment is <code>2</code> which is
        <code>010</code> in binary.
      </td>
    </tr>
    <tr>
      <td>MaxVendorId</td>
      <td>16 bits</td>
      <td>The maximum Vendor ID that is included.</td>
      <td>
        Because this section can be a variable length, this indicates the
        last ID of the section so that a decoder will know when it has
        reached the end.
      </td>
    </tr>
    <tr>
      <td>IsRangeEncoding</td>
      <td>1 bit</td>
      <td>
        <code>1</code> Range<br />
        <code>0</code> BitField
      </td>
      <td>
        The encoding scheme used to encode the IDs in the section – Either a
        BitField Section or Range Section follows. Encoding logic should
        choose the encoding scheme that results in the smaller output size
        for a given set.
      </td>
    </tr>
    <tr style="background-color:#999;">
      <td colspan="2"><strong>BitField Section</strong></td>
      <td colspan="2">
        <strong>Encodes one allowed vendor bit per Vendor ID</strong>
      </td>
    </tr>
    <tr>
      <td>BitField</td>
      <td>MaxVendorId bits</td>
      <td>
        <p>
          One bit for each vendor
        </p>
        <p>
          <code>1</code> Allowed<br />
          <code>0</code> Not Allowed
        </p>
      </td>
      <td>
        The value for each Vendor ID from <code>1</code> to MaxVendorId.
        <p>
          Set the bit corresponding to a given Vendor ID to
          <code>1</code> if the Publisher permits the vendor to use OOB
          legal bases.
        </p>
      </td>
    </tr>
    <tr style="background-color:#999;">
      <td colspan="2"><strong>Range Section</strong></td>
      <td colspan="2">
        <strong
          >Encodes range groups of Vendor IDs who the publisher is allowing
          to use OOB legal bases</strong
        >
      </td>
    </tr>
    <tr>
      <td>NumEntries</td>
      <td>12 bits</td>
      <td colspan="2">Number of RangeEntry sections to follow</td>
    </tr>
    <tr style="border-top:5px solid black;">
      <td colspan="2">RangeEntry (repeated NumEntries times)</td>
      <td colspan="2">
        A single or range of Vendor ID(s) of Vendor(s) who are allowed to
        use OOB legal bases on the given publisher’s digital property. If
        a Vendor ID is not within the bounds of the ranges then they are not
        allowed to use OOB legal bases on the given publisher's digital
        property..
      </td>
    </tr>
    <tr>
      <td>IsARange</td>
      <td>1 bit</td>
      <td>
        <code>1</code> Vendor ID range<br />
        <code>0</code> Single Vendor ID
      </td>
      <td>
        If more than one Vendor ID is included in this RangeEntry then this
        describes a range of Vendor IDs and this value is 1. If only one
        Vendor ID is included then the value is <code>0</code>.
      </td>
    </tr>
    <tr>
      <td>StartOrOnlyVendorId</td>
      <td>16 bits</td>
      <td>
        The first ID of an inclusive contiguous ascending-order series of
        Vendor IDs even if the series is only a cardinality of 1.
      </td>
      <td>
        This is the first or only Vendor ID that is allowed in this
        RangeEntry.
      </td>
    </tr>
    <tr>
      <td>EndVendorId</td>
      <td>16 bits</td>
      <td>
        The last ID of the inclusive contiguous ascending-order series of
        Vendor IDs started with StartOrOnlyVendorId but only if that series
        has a cardinality greater than 1, otherwise this field is omitted.
      </td>
      <td>
        The end of the series of Vendor IDs – this is omitted if
        <code>IsARange=0</code>.
      </td>
    </tr>
  </tbody>
</table>


#### Publisher Purposes Transparency and Consent

Publishers may need to establish transparency and consent for a set of personal data processing purposes for their own use. For example, a publisher that wants to set a frequency-capping first-party cookie should request user consent for Purpose 1 "Store and/or access information on a device" in jurisdictions where it is required.

The _**[Publisher TC](#publisher-purposes-transparency-and-consent)**_ segment in the TC string represents the publisher's own transparency & consent signals and is separated from the general TC String segments. This segment supports the standard list of purposes defined by the TCF as well as Custom Purposes defined by the publisher if they so choose. Vendors should not rely on the _**[Publisher TC](#publisher-purposes-transparency-and-consent)**_ segment unless they're in agreement with the publisher to do so.


<table>
  <thead>
    <tr style="background-color:#000;color:#FFF;">
      <td><strong>Field Name</strong></td>
      <td><strong>Bits</strong></td>
      <td><strong>Values</strong></td>
      <td><strong>Description</strong></td>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>SegmentType</td>
      <td>3 bits</td>
      <td>
        <p>
          Enum
        </p>
        <p><code>0</code> Default (<em>Core</em>)</p>
        <p><code>1</code> <em>DisclosedVendors</em></p>
        <p><code>2</code> <em>AllowedVendors</em></p>
        <p>
          <strong><code>3</code> PublisherTC</strong>
        </p>
      </td>
      <td>
        <strong><em>PublisherTC</em></strong> segment is 3 which is
        <code>011</code> in binary.
      </td>
    </tr>
    <tr>
      <td>PubPurposesConsent</td>
      <td>24 bits</td>
      <td>
        One bit for each Purpose:
        <p>
          <code>1</code> Consent<br />
          <code>0</code> No Consent
        </p>
      </td>
      <td>
        The user's consent value for each Purpose established on the legal
        basis of consent, for the publisher
        <p>
          The Purposes are numerically identified and published in the
          <a href="#the-global-vendor-list">Global Vendor List</a>. From
          left to right, Purpose 1 maps to the <code>0</code>th bit, purpose
          24 maps to the bit at index 23.
        </p>
      </td>
    </tr>
    <tr>
      <td>PubPurposesLITransparency</td>
      <td>24 bits</td>
      <td>
        One bit for each Purpose:<br /><code>1</code> legitimate interest
        established<br /><br /><code>0</code> legitimate interest was
        <u><strong>NOT</strong></u> established or it was established but
        user exercised their “Right to Object” to the Purpose
      </td>
      <td>
        The Purpose’s transparency requirements are met for each Purpose
        established on the legal basis of legitimate interest and the user
        has not exercised their “Right to Object” to that Purpose.
        <p>
          By default or if the user has exercised their “Right to Object to
          a Purpose, the corresponding bit for that purpose is set to
          <code>0</code>. From left to right, Purpose 1 maps to the
          <code>0</code>th bit, purpose 24 maps to the bit at index 23.
        </p>
      </td>
    </tr>
    <tr>
      <td>NumCustomPurposes</td>
      <td>6 bits</td>
      <td>The number of Custom Purposes.</td>
      <td>
        Custom purpose IDs are numbered <code>1</code> to
        NumberCustomPurposes. Custom purposes will be defined by the
        publisher and displayed to a user in a CMP user interface.
        <p>
          If the publisher does not use any Custom Purposes, this field is
          set to <code>0</code> and the following two fields will be
          omitted.
        </p>
      </td>
    </tr>
    <tr>
      <td>CustomPurposesConsent</td>
      <td>NumCustomPurposes</td>
      <td>
        One bit for each Custom Purpose:
        <p>
          <code>1</code> Consent<br />
          <code>0</code> No Consent
        </p>
      </td>
      <td>
        The consent value for each CustomPurposeId from 1 to
        NumberCustomPurposes
      </td>
    </tr>
    <tr>
      <td>CustomPurposesLITransparency</td>
      <td>NumCustomPurposes</td>
      <td>
        One bit for each Custom Purpose:<br /><code>1</code> legitimate
        interest established<br /><br /><code>0</code> legitimate interest
        was <u><strong>NOT</strong></u> established or it was established
        but user exercised their “Right to Object” to the Custom Purpose
      </td>
      <td>
        The legitimate Interest disclosure establishment value for each
        CustomPurposeId from <code>1</code> to NumberCustomPurposes
      </td>
    </tr>
  </tbody>
</table>

## The Global Vendor List

The Global Vendor List (GVL) is a technical document that CMPs download from a domain managed and published by IAB Europe. It lists all registered and approved Vendors, as well as standard Purposes, Special Purposes, Features, Special Features and Stacks. The information stored in the GVL is used for determining what legal disclosures must be made to the user.

### I’m a vendor, how do I get added to the Global Vendor List?

The registration process is described here: [https://iabeurope.eu/tcf](https://iabeurope.eu/tcf)

### What is contained in the Global Vendor List?

*   A Global Vendor List Specification Version
*   A Global Vendor List version
*   A TCF Policy Version
*   A Last Updated Date
*   A list of standard Purposes
*   A list of Special Purposes
*   A list of standard Features
*   A list of Special Features.
*   A list of Stacks
*   A list of Vendors and their:
    *   Numeric ID which is incrementally assigned and never re-used – deleted Vendors are just marked as deleted.
    *   Name.
    *   List of Purposes for which they are requesting consent.
    *   List of Purposes for which they require to be transparently disclosed as their legitimate interest.
    *   List of Purposes they have the flexibility to either use a consent or a legitimate interest legal basis.
    *   List of Special Purposes to transparently disclose as their legitimate interest that a user has no right to object.
    *   List of Features they use across Purposes.
    *   List of Special Features they use across Purposes.
    *   GDPR/privacy policy page URL.
    *   HTTP “overflow” options which includes a <code>GET</code> request maximum size in kilobytes to help diagnose problems with TC String passing as well as limit oversized strings.


### Where can I access the Global Vendor List?

The GVL is in JSON format and the current version at any given time can be retrieved using the following URL structure:

[https://vendor-list.consensu.org/v2/vendor-list.json](https://vendor-list.consensu.org/v2/vendor-list.json)

Previous versions of the Global Vendor List are available here:

[https://vendor-list.consensu.org/v2/archives/vendor-list-v{vendor-list-version}.json](https://vendor-list.consensu.org/v2/archives/vendorlist-v{vendor-list-version}.json)

Where ‘vendor-list-version’ corresponds to the ‘vendorListVersion’ property in the GVL, for example, the following URL would retrieve the GVL update published with version 138

https://vendor-list.consensu.org/v2/archives/vendor-list-v138.json

Previous versions of the GVL may only be used in cases when the current version cannot be downloaded (such as when operating in-app while offline), or for change control management.

**IMPORTANT NOTE**: the original vendorlist.consensu.org domain will be decommissioned on January 31st 2021. The new domain for GVL resources is vendor-list.consensu.org.

### TCF version 1 of the Global Vendor List (deprecated)

For reference, the URL for version 1 of the TCF was:

[https://vendorlist.consensu.org/vendorlist.json](https://vendorlist.consensu.org/vendorlist.json)

Version 1 of the Global Vendor List and all version 1 archives will continue to be maintained until support officially ends in 2020. At that time, these files will be deprecated and only version 2 and newer of the Global Vendor List will be available.

### Translations for Purposes, Special Purposes, Features, and Special Features

Translations of the names and descriptions for Purposes, Special Purposes, Features, and Special Features to non-English languages are contained in a file where attributes containing English content (except vendor declaration information) are translated, and can be found here:

https://vendor-list.consensu.org/v2/purposes-{language}.json

Where ‘language’ is a two letter lowercase [ISO 639-1](https://en.wikipedia.org/wiki/ISO_639-1) language code. Supported languages are listed at the following URL:

[https://register.consensu.org/Translation](https://register.consensu.org/Translation)

### How often is the Global Vendor List updated?

As of the publication of this document, changes to the Global Vendor List are published weekly at 5:00 PM Central European Time on Thursdays. IAB Europe reserves the right to change this time and will notify CMP members of any changes.

### CMPs using the GVL

CMPs must use the **latest** available version of the GVL whenever the interface is surfaced to the user to provide transparency or request consent. This condition applies to first-time and renewal interactions, as well as interactions that involve reviewing and updating settings.

In some cases, due to caching requirements and low connectivity environments, such as for mobile in-app experiences, it may not be possible to use the latest version of the GVL:

* For a delay caused by caching requirements, the penultimate version of the GVL may be considered the latest available version.
* For a delay caused by a lack of connectivity, the last cached version of the GVL may be used but must be updated as soon as connectivity is restored.

To determine whether the interface should be resurfaced to a user, the CMP must compare the latest version of the GVL with the archived version of the GVL identified in the TC String (assuming they are different). The CMP is not required to resurface the interface to the user if the versions are different. The timing and reasons for resurfacing the interface to users is at the discretion of the CMP and the publisher.

**Strict restrictions on accessing and caching the GVL apply and are detailed below.**

### Vendors using the GVL

Vendors must use the version of the GVL encoded in the TC String received to:

* Determine if they have the legal bases they need to process the user's personal data.
* Determine if any vendor they are about to pass personal data to, also has the necessary legal bases to process personal data.

**Strict restrictions on accessing and caching the GVL apply and are detailed below.**

### Accessing and caching the Global Vendor List

In TCF v1 it was possible for client-side CMP applications to load the GVL directly via CORS. Given the scale of the TCF and the high volume of requests for the Global Vendor List, this is no longer possible from TCF v2.0 onward. All requests for the GVL must now be server-side.

Current and previous GVL resources, as well as purpose translations, are configured with [cache-control headers](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control). Server-side applications must cache these resources in the same way that a browser would - the file must be requested and cached using the specified ```max-age``` value in the header. Once the cache expires, the resource can be requested again. Resources must not be cached for a period other than ```max-age```.

Previous versions of the GVL must be cached for at least the period specified by the cache-control headers and may be cached indefinitely as they are static resources.

### CMPs accessing and caching the GVL

Client-side CMP applications must not load GVL resources directly from vendor-list.consensu.org - instead they must be loaded and hosted by a CMP’s server-side application and then passed to the client-side CMP application.

As stated above, CMP server-side applications must cache these resources in the same way that a browser would. For example, if the ```max-age``` value in the header is one week, the server-side application must do the following:

* Request a GVL resource
* Cache the resource for one week
* When the cache expires after one week, clear the cache if necessary and re-request the resource

**Important:** The volume of usage will be monitored carefully by the managing organisation and any CMP not adhering to this request limit will be blocked from accessing the GVL.

To prevent client-side applications from repeatedly downloading files, CMPs should set cache-control headers on HTTP responses sent to client-side requests for their self-hosted GVL resources. This will ensure that browsers automatically cache the resources, circumventing the need to repeatedly request files over HTTP.

### Vendors accessing and caching the GVL

Vendor requests for GVL resources must be loaded and cached by the server-side application.

As stated above, vendor server-side applications must cache these resources in the same way that a browser would. For example, if the ```max-age``` value in the header is one week, the server-side application must do the following:

* Request a GVL resource
* Cache the resource for one week
* When the cache expires after one week, clear the cache if necessary and re-request the resource

**Important:** The volume of usage will be monitored carefully by the managing organisation and any vendor not adhering to this request limit will be blocked from accessing the GVL.

#### Using a compressed version of the Global Vendor List

In order to control the bandwidth used by requests for the GVL file, vendors and CMPs must request a compressed version of the GVL. This can be done by sending `Accept-Encoding` headers on the `GET` request for the file.

**Example:**

```
Accept-Encoding: gzip, deflate, br
```


A browser will add this header automatically and, therefore, nothing needs to be done for an in-browser request.  Server-side requests are another matter because server software may not decompress the response automatically. Make sure your server requests send the options your service is capable of decoding in your `Accept-Encoding` header.


#### Global Vendor List and TCF Policy Updates

When a change occurs in the TCF [Policies](https://iabeurope.eu/iab-europe-transparency-consent-framework-policies/), the update invalidates the previous declarations of vendors listed on the previous version of the GVL. These policy changes happen infrequently, but when they do, a CMP is required to discard the user’s current TC String and resurface the user interface to provide new disclosures, capture new consent, and encode a new TC String without migrating any old values over from the old one.

To determine if TCF [Policies](https://iabeurope.eu/iab-europe-transparency-consent-framework-policies/) have changed, CMPs shall compare the _**TcfPolicyVersion**_ encoded in a TC String with the _**TcfPolicyVersion**_ property in the latest Global Vendor List published by the Managing Organisation – if the values are different then the TCF Policy has changed and a CMP will be required to provide new disclosures, capture new consent, and encode a new TC String.


### Example Global Vendor List JSON Object

Here is an annotated example of the GVL’s JSON format:

```javascript
{
  "gvlSpecificationVersion": 2,
  "vendorListVersion": 133, // incremented with each published file change
  "tcfPolicyVersion": 2, // The TCF MO will increment this value whenever a GVL change (such as adding a new Purpose or Feature or a change in Purpose wording) legally invalidates existing TC Strings and requires CMPs to re-establish transparency and consent from users. TCF Policy changes should be relatively infrequent and only occur when necessary to support changes in global mandate. If the policy version number in the latest GVL is different from the value in your TC String, then you need to re-establish transparency and consent for that user. A version 1 format TC String is considered to have a version value of 1.
  "lastUpdated": "2018-05-28T00:00:00Z",
  "purposes": {

    /**
     * Information published for each Purpose
     *
     * "id": number, REQUIRED
     * "name": string, REQUIRED
     * "description": string, REQUIRED
     * "descriptionLegal": string, REQUIRED
     * "consentable": boolean, OPTIONAL, default=true  false means CMPs should never afford users the means to provide an opt-in consent choice
     * "rightToObject": boolean, OPTIONAL, default=true  false means CMPs should never afford users the means to exercise a right to object
    */
    "1": {
      "id": 1,
      "name": "Storage and access of information",
      "description": "...",
      "descriptionLegal": "..."
    },
    // ... more purposes from id=2 to id=9 (up to no higher than id=24)
    "10": {
      "id": 10,
      "name": "Develop and improve product",
      "description": "...",
      "descriptionLegal": "...",
      "consentable": false,
      "rightToObject": false
    }
  },
  "specialPurposes" : {
    "1": {
      "id": 1,
      "name": "Security, Fraud Prevention, Debugging",
      "description": "...",
      "descriptionLegal": "...",
      "consentable": false,
      "rightToObject": false
    },
    "2": {
      "id": 2,
      "name": "Technical ad and content delivery",
      "description": "...",
      "descriptionLegal": "...",
      "consentable": false,
      "rightToObject": false
    }
  },
  "features" : {
    "1": {
      "id": 1,
      "name": "Matching Data to Offline Sources",
      "description": "Combining data from offline sources that were initially collected in other contexts",
      "descriptionLegal": "..."
    }

  // ... more features from id=2 up to no higher than id=64.

  },

  /**
   * Special features differ from simple features in that CMPs MUST provide
   * users with a means to signal an opt-in choice as to whether vendors
   * may employ the feature when performing any purpose processing.
   * See Policies for specifics.
   */
  "specialFeatures" : {
    "1": {
      "id": 1,
      "name": "Precise Geolocation",
      "description": "...",
      "descriptionLegal": "..."
    },
    "2": {
      "id": 2,
      "name": "Active Fingerprinting",
      "description": "...",
      "descriptionLegal": "..."
    }

  // ... more special features from id=3 up to no higher than id=8.
    //
  },
  "vendors": {
  /**
   * Information published for each vendor
   *
   * "id": numeric, REQUIRED
   *
   * "name": string, REQUIRED
   *
   * "purposes": conditionally OPTIONAL (see "Constraints") array of positive 
   * integers. List of Purpose ids declared as performed on the legal basis of
   * consent
   *
   * "legIntPurposes" conditionally OPTIONAL (see "Constraints") array of
   * positive integers. List of Purpose ids declared as performed on the legal
   * basis of legitimate interest
   *
   * "flexiblePurposes": OPTIONAL array of positive integers. Array may be
   * empty. List of purpose ids where the vendor is flexible regarding the
   * legal basis; they will perform the processing based on consent or a
   * legitimate interest. The 'default' is determined by which of the other two
   * mutually-exclusive purpose fields is used to declare the purpose for the
   * vendor
   *
   * Constraints:
   *   Either purposes OR legIntPurposes can be missing/empty, but not both.
   *
   *   A Purpose id must not be present in both purposes and legIntPurposes
   *
   *   A Purpose id listed in flexiblePurposes must have been declared in one
   *   of purposes or legIntPurposes.
   *
   *   Purpose id values included in the three purpose fields must be in the
   *   range from 1 to N, where N is the highest purpose id published in this
   *   GVL file.
   *
   * "specialPurposes": array of positive integers, OPTIONAL. Array may be
   * empty. List of Special Purposes declared as performed on the legal basis
   * of a legitimate interest
   *
   * "features": array of positive integers, OPTIONAL. Array may be empty. List
   * of Features the Vendor may utilize when performing some declared Purposes
   * processing.
   *
   * "specialFeatures": array of positive integers, OPTIONAL. Array may be
   * empty. List of Special Features the Vendor may utilize when performing
   * some declared Purposes processing.
   *
   * "policyUrl": url string, REQUIRED URL to the Vendor's privacy policy
   * document.
   *
   * "deletedDate": date string ("2019-05-28T00:00:00Z") OPTIONAL, If present,
   * vendor is considered deleted after this date/time and MUST NOT be
   * established to users.
   *
   * "overflow": object specifying the vendor's http GET request length  limit
   * OPTIONAL. Has the following members & values
   *
   *   "overflow": {
   *     "httpGetLimit": 32   /* 32 or 128 are supported options */
   *   }
   *    If a vendor entry does not include this attribute then the vendor has no
   *    overflow options and none can be inferred.
   */

  "1":{
    "id": 1,
    "name": "Vendor Name",
    "purposes": [1],
    "specialPurposes": [1],
    "legIntPurposes": [2, 3],
    "flexiblePurposes": [1, 2],
    "features": [1, 2],
    "specialFeatures": [1, 2],
    "policyUrl": "https://vendorname.com/gdpr.html",
    "deletedDate": "2019-02-28T00:00:00Z",
    "overflow": {
      "httpGetLimit": 32   /* 32 or 128 are supported options */
      }
    }
  // ... more vendors
  },

  "stacks": {
    "1": {
      "id": 1,
      "purposes" : [],
      "specialFeatures" : [1,2],
      "name" : "Precise geolocation data, and identification through device scanning",
      "description" : "Precise geolocation and information about device characteristics can be used."
    }
  }
}
````


## Global CMP List Specification
The Global CMP List (GCL) is a JSON format document that lists all CMPs registered with the Transparency and Consent Framework (TCF). There are separate files for v1.1 and v2 of the framework. These files are used by vendors to determine which CMPs are compliant and active within the framework, in order to ascertain whether a given CMP ID found in a consent string or TC String is valid.

IMPORTANT NOTE: all CMPs that have registered with the TCF are listed in these files. CMPs that are no longer active for whatever reason, have the `deletedDate` property set. Consent strings or TC Strings for CMPs with a `deletedDate` set must be considered invalid after that date/time and must be discarded immediately and not passed downstream.

### What is contained in the Global CMP List?
* A Last Updated Date.
* A list of CMPs detailing:
  * A Numeric ID which is incrementally assigned and never re-used - inactive CMPs are marked as deleted.
  * Their Name.
  * Whether or not the CMP is a commercial service.
  * If applicable, the date/time after which CMP is considered inactive.

### Where can I access the Global CMP List?
The GCL is in JSON format and the current version at any given time can be retrieved using the following URL:

v2: https://cmplist.consensu.org/v2/cmp-list.json
v1: https://cmplist.consensu.org/cmp-list.json

### How often is the Global CMP List updated?
As of the publication of this document, changes to the Global CMP List are published weekly at 5:00 PM Central European Time on Thursdays. IAB Europe reserves the right to change this time and will notify members of any changes.

### Caching the Global CMP List
Strict restrictions on caching the GCL apply.

All requests for the Global CMP List must honour the cache-control headers and must not cache the resource with different settings.

Note: There may be a delay of up to the maximum cache interval in retrieving the latest version of the Global CMP List.

### Server-side caching of the GCL
As requests for a GCL file will not be in a browser context, GCL files must be cached explicitly server-side according to the cache-control headers.

Application logic must only request one version of the GCL during the cache period specified in the cache-control header. For example, if the caching period is one week, only one request for the current GCL file must be received per week.

Note: The volume of usage will be monitored carefully by the managing organisation (MO) and any organisations not adhering to this request limit will be blocked from accessing the GCL.

### Using a compressed version of the Global CMP List
A compressed version of the GCL must be requested. This can be done by sending Accept-Encoding headers on the GET request for the file:

- Example: Accept-Encoding: gzip, deflate, br

### Example Global CMP List JSON Object
Here is an example of the GCL’s JSON format:


```
{
  "lastUpdated": "2019-10-31T00:00:00Z",
  "cmps": {

    /**
     * Information published for each CMP
     *
     * "id": numeric, REQUIRED
     * "name": string, REQUIRED
     * "isCommercial": boolean, REQUIRED
     * "deletedDate": date string ("2019-05-28T00:00:00Z") OPTIONAL
     *  If present, CMP is considered deleted after this date/time and
     *  consent string or TC String must be discarded immediately.
     */

    "2":{
      "id": 2,
      "name": "Chandago",
      "isCommercial": true
    },

    // ... more CMPs

    "136":{
      "id": 136,
      "name": "M6 Web",
      "isCommercial": false,
      "deletedDate": "2019-08-06T00:00:00Z"
    }

    // ... more CMPs

  }
}
```

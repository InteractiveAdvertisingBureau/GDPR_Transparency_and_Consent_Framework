# IAB Europe Transparency and Consent Framework Implementation Guidelines 

**August 2019**

This document provides technical implementation guidelines related to the [IAB Europe Transparency and Consent Framework (TCF) v2 technical specs](https://github.com/InteractiveAdvertisingBureau/GDPR-Transparency-and-Consent-Framework). The IAB Tech Lab GDPR Technical Working Group has collaborated on the following implementation guidelines, and will continue to produce resources supporting industry adoption of the Framework. The intended audience of this document includes product and engineering teams who are building technology based on this framework, and who are looking for guidance on implementation strategies such as questions to ask your platform partners or avoiding common pitfalls.

Policy FAQ, webinars, and other resources are available at 
[https://www.iabeurope.eu/tcf](https://www.iabeurope.eu/tcf) 




### [Introduction to the TCF](#Intro)<br>
### [Common Questions](#commonquestions)<br>
&nbsp;&nbsp;&nbsp;&nbsp;**[Do I need to read the Policy?](#needpolicy)**<br>
&nbsp;&nbsp;&nbsp;&nbsp;**[What changed in v2?](#changes)**<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[Within the Transparency and Consent String (TC String)](#changetcstring)<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[Within the Global Vendor List (GVL) Format](#changegvl)<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[Within the Consent Management Platform API](#changecmp)<br>
&nbsp;&nbsp;&nbsp;&nbsp;**[What is legitimate interest, and what’s new for vendor registration?](#whatisli)**<br>
&nbsp;&nbsp;&nbsp;&nbsp;**[Is v2 backwards compatible?](#compatibility)**<br>
&nbsp;&nbsp;&nbsp;&nbsp;**[How do I evaluate the details provided in the TC String?](#evaluatetcstring)**<br>
&nbsp;&nbsp;&nbsp;&nbsp;**[How should I handle multiple signals with different information?](#mergesignals)**<br>
&nbsp;&nbsp;&nbsp;&nbsp;**[What is OOB?](#oob)**<br>
&nbsp;&nbsp;&nbsp;&nbsp;**[When do I include Allowed Vendors and/or Disclosed Vendors in the TC string?](#when-do-i-include-allowed-vendors)**<br>
### [Publisher guidelines](#pub)
&nbsp;&nbsp;&nbsp;&nbsp;**[What is a Consent Management Platform (CMP) and why do I, as a Publisher, need one?](#whatiscmp)**<br>
&nbsp;&nbsp;&nbsp;&nbsp;**[What publisher controls are available? What happened to Pubvendors?](#pubvendor)**<br>
&nbsp;&nbsp;&nbsp;&nbsp;**[The Global Vendor List](#gvl)**<br>
&nbsp;&nbsp;&nbsp;&nbsp;**[Withdrawal of consent](#withdraw)**<br>
### [Vendor guidelines (DSPs, Agencies, DMPs)](#vendor)
&nbsp;&nbsp;&nbsp;&nbsp;**[How do I find the TC String?](#findtcstring)**<br>
&nbsp;&nbsp;&nbsp;&nbsp;**[How do I send the TC string?](#sendtcstring)**<br>
&nbsp;&nbsp;&nbsp;&nbsp;**[How to determine legal bases from the TC String?](#detlegalbasis)**<br>
&nbsp;&nbsp;&nbsp;&nbsp;**[How to determine if data may be transmited?](#handletcstring)**<br>
&nbsp;&nbsp;&nbsp;&nbsp;**[Agency guidelines](#agencyguide)**<br>
&nbsp;&nbsp;&nbsp;&nbsp;**[DSP guidelines](#dspguide)**<br>
&nbsp;&nbsp;&nbsp;&nbsp;**[DMP guidelines](#dmpguide)**<br>
&nbsp;&nbsp;&nbsp;&nbsp;**[How does the TC String apply to non-OpenRTB situations?](#nonrtb)**<br>
### [Consent Management Platform (CMP) guidelines](#cmp)
&nbsp;&nbsp;&nbsp;&nbsp;**[1. Collecting consent from users](#collectconsent)**<br>
&nbsp;&nbsp;&nbsp;&nbsp;**[2. Sharing consent with vendors](#shareconsent)**<br>
&nbsp;&nbsp;&nbsp;&nbsp;**[3. Storing Consent](#storeconsent)**<br>
&nbsp;&nbsp;&nbsp;&nbsp;**[4. Withdrawal of consent and other non-TCF policy](#withdrawconsent)**<br>
&nbsp;&nbsp;&nbsp;&nbsp;**[5. Encoding publisher restrictions](#pubrestrenc)**<br>
&nbsp;&nbsp;&nbsp;&nbsp;**[6. CMP interface requirements](#cmpreq)**<br>
### [How do vendors outside the RTB bidstream query a CMP?](#outsidertb)
### [Other Frequently Asked Questions](#otherfaq)
&nbsp;&nbsp;&nbsp;&nbsp;**[Are cookies required for working with the CMP API?](#cookiesrequired)**<br>
&nbsp;&nbsp;&nbsp;&nbsp;**[What is the long-term plan for consent storage?](#futurestorage)**<br>
&nbsp;&nbsp;&nbsp;&nbsp;**[Can I also use the API for CCPA or other laws?](#ccpa)**<br>
&nbsp;&nbsp;&nbsp;&nbsp;**[Related resources](#resources)**<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[Will these FAQ be updated?](#faqupdates)**<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[How can I learn more?](#learnmore)**<br>


# Introduction to the TCF <a name="intro"></a>
The Transparency and Consent Framework (TCF) was created to help all parties who display and manage digital advertising and develop targeted content comply with the European Union’s General Data Protection Regulation (GDPR) and ePrivacy Directive (ePD) when processing personal data and/or accessing and/or storing information on a user’s device. 

It allows publishers and website operators to communicate to vendors, in a standardized way, what preferences users have expressed when it comes to their personal data. A vendor is a company that participates in the delivery of digital advertising within a publisher’s website, app, or other digital content, that either accesses an end user’s device or browser or processes personal data about end users visiting the publishers content.

The TCF was first introduced in April 2018. This document refers to version 2 of the TCF, announced in August 2019, which introduces significant changes and is not backward-compatible with the earlier version.

The communication between publishers and vendors must pass through a Consent Management Platform (CMP). A CMP can be operated by anyone, as long as the entity that operates it has completed registration on the CMP list  and is approved by IAB Europe . A list of all approved CMPs is available [here](https://iabeurope.eu/cmp-list/).

CMPs centralise and manage transparency for and consent and objections of the end users, acting as an intermediary between the Publisher, end user and vendors, using information distributed via the Global Vendor List (GVL), which contains the updated list of vendors adhering to the framework. Please refer to the Policy for complete definition of a CMP. Only CMPs can write and read the Transparency and Consent string, where consent is stored. Their role is to make this information available to vendors within the technical specifications that the framework states.

When configuring their CMP, publishers can make a number of decisions:
- Consent can be shared with all other publishers adhering to the framework or kept local to the specific publisher;
- A number of restrictions can be applied, including allowing only a selected list of vendors to process data through their properties.
A current list of vendors adhering to the framework can be found [here](https://vendorlist.consensu.org/v2/vendor-list.json).

Any party considering adoption of the TCF must read and follow the TCF Policies, outlined in the [IAB Europe Transparency & Consent Framework Policies](https://iabeurope.eu/iab-europe-transparency-consent-framework-policies/). Correct implementation of the framework is impossible without following the requirements in the TCF Policy.

## Who should read this document?
Publishers, Vendors (DMP, AdServer, Advertisers, …) and registered CMPs who want to work within the TCF can use this document as guidance to implement the technology to support their efforts. This document addresses common (technical) questions and makes it easier for companies to understand the coherences of the TCF policy and technical specifications.

## How can I submit my questions?
You can learn more about IAB Tech Lab support of the TCF and involvement with IAB Europe at the following URL: 

https://iabtechlab.com/standards/gdpr-transparency-and-consent-framework/

You can also submit general feedback on IAB Tech Lab draft specifications to feedback@advertisingconsent.eu and any technical feedback to transparencyframework@iabtechlab.com. 

# Common Questions <a name="commonquestions"></a>
## Do I need to read the Policy? <a name="needpolicy"></a>
Yes, the technical specifications for the TC String and CMP API were developed to support policies outlined in the Transparency and Consent Framework (TCF) Policies for version 2. Implementing the technology requires adherence to these policies.

If you have not yet read tech specs or policy, you can access these documents here: 
- [IAB Europe Transparency and Consent Framework Policies](https://iabeurope.eu/iab-europe-transparency-consent-framework-policies/)
- [Transparency and Consent String, Version 2](https://github.com/InteractiveAdvertisingBureau/GDPR-Transparency-and-Consent-Framework/blob/master/TCFv2/IAB%20Tech%20Lab%20-%20Consent%20string%20and%20vendor%20list%20formats%20v2.md)
- [Consent Management Platform API, Version 2](https://github.com/InteractiveAdvertisingBureau/GDPR-Transparency-and-Consent-Framework/blob/master/TCFv2/IAB%20Tech%20Lab%20-%20CMP%20API%20v2.md)

All definitions in the implementation guidelines should reflect definitions provided in the Policy. 

## What changed in v2?<a name="changes"></a>
Version 2 of the policy and technical specification marks significant updates to better support GDPR legislation and enhance the user experience, while remaining flexible to account for unique scenarios within the framework. 

Changes across the Framework are listed below and grouped according to supporting documentation for: the TC String, the Global Vendor List,  and the CMP API. 

### Within the Transparency and Consent String (TC String)<a name="changetcstring"></a>
- Special jurisdiction handling using publisher country code
- Publisher TC String for publisher legal basis establishment*
- Publisher restrictions added
- Legitimate interest establishment signals added
- “Right to object” to legitimate interests support added
- Out-of-Band (OOB) legal basis support
	- Created Allowed Vendors TC String segment
	- Created Disclosed Vendors TC String segment 
- Enhanced TC String Encoding
	- TC String segmentation (core, publisher, oob segments) 
	- Revised Macro support 
- Text revisions based on requests for clarification/consistency

### Within the Global Vendor List (GVL) Format<a name="changegvl"></a>
- Includes recent policy updates
- Better wording to distinguish between “policy version” and “GVL version”

### Within the Consent Management Platform API
- Event Listeners, Support for CMP status change, such as when a user makes an active choice, and a new TC string is generated
- New parameter order
- New function signature name
- Inclusion of passing “version” argument
- Addition of in-app “command” for in-app specific values
- Updates to support special jurisdiction, handling Out-of-Band (OOB) , and publisher restrictions

## What is legitimate interest, and what’s new for vendor registration?<a name="whatisli"></a>
Under the GDPR, a legal basis is required for processing a user’s data. While consent is the most common legal basis for processing a user’s data, legitimate interest is another legal basis that a vendor may use. For more information legitimate interest and when it can be used as a legal basis, please visit gdpr-info.eu where the regulation is posted. Chapter 2, article 6, describes legal bases under the GDPR. 

## Is v2 backwards compatible? <a name="compatibility"></a>
No. The changes in v2 are substantial enough that a completely new implementation is required. With the list of features, purposes, stacks, new structure for the TC String, and a number of other changes, none of the updates map to anything in previous versions. After an initial transition phase in v2 adoption, older versions will be deprecated.

## How do I evaluate the details provided in the TC String?<a name="evaluatetcstring"></a>
The TC String includes four (4) segments of information: the core string, publisher restrictions, publisher-approved vendors, and out-of-band (OOB) signaling. The technical specs describing the TC String provide details on specific information provided in each segment. These details may change from the start of the transaction to the end of the transaction. Vendors must evaluate the four segments of a string as it relates to a given transaction, determine the intent of the information provided, and proceed accordingly.

## How should I handle multiple signals with different information?<a name="mergesignals"></a>
Sometimes two or more TC Strings might contain different preferences for different vendors. For example, one String includes consent signals for vendors 1, 2, and 3. Later, the user is asked for consent on vendors 3, 4, and 5, but rejects all three. In this example, the most recent signal received for vendor 3 is that of no consent and should be recorded as such despite previous signals. However, we cannot anticipate and provide guidance for all scenarios. Vendors should update the TC String, where applicable, with details that reflect the intent of the user and meets the requirements of the TCF. 

## What is OOB? <a name="oob"></a>
OOB is an abbreviation for Out-of-Band legal basis and represents a signal that transparency & consent was achieved for a vendor outside of the TCF, which is an in-band establishment. Publishers can choose whether to support OOB or not, and if they do, they may provide a list of approved vendors allowed to claim OOB. Look for details outlined in documentation for the TC String.

#### When to Include Allowed and Disclosed Vendor Segments in the TC string

There are three primary conditions to consider when determining whether or not to include one or both of the OOB Signal Segments – They are whether or not the TC string is a globally-scoped string (**P**), whether the publisher supports OOB Signaling (**R**), and whether or not the TC string is intended to be saved in a cookie or other storage mechanism as opposed to being passed in a TCData object through the CMP API to Vendors for downstream interpretation.  Representing those conditions symbolically:

  * **P**: TC string is globally-scoped
  * **Q**: TC string is for saving in a cookie, local storage or some other mechanism (in the below truth table, a F for this value represents the TC string being surfaced through the CMP API for Vendors)
  * **R**: The Publisher Supports OOB Signaling
  * **S**: Should Include Disclosed Vendors Segment
  * **T**: May Include Allowed Vendors Segment

**Whether to include the _[DisclosedVendors](#disclosed-vendors-oob)_ Segment is expressed as**

**P ∧ Q ∨ R → S**

In plain english, if the TC string is globally-scoped (**P**) and the TC string is intended to be saved (**Q**) or the publisher supports OOB Signaling (**R**) then the _**[DisclosedVendors](#disclosed-vendors-oob)**_ Segment should be included (**S**).


**Truth Table for Disclosed Vendors**

| P | Q | R | S | T |
|---|---|---|---|---|
| T | T | T | T | F |
| T | T | F | T | F |
| T | F | T | T | T |
| T | F | F | F | F |
| F | T | T | F | F |
| F | T | F | F | F |
| F | F | T | F | F |
| F | F | F | F | F |

# Publisher guidelines <a name="pub"></a>
## What is a Consent Management Platform (CMP) and why do I, as a Publisher, need one?<a name="whatiscmp"></a>
A Consent Management Platform (CMP) is operated by a controller and is used to manage transparency and consent (TC) preferences signaled by the end user. The CMP installs a user dialogue on the publisher’s digital properties to capture and manage TC information from a user. This installed user dialogue software also surfaces TC information to vendor technologies operating as part of the publisher’s digital property and supply chain. The CMP acts as an intermediary between the publisher, end user, and vendors.

Please refer to TCF Policy for a complete definition of a CMP. A registered CMP is required if the publisher or website operator wishes to work under the Policies of the TCF.  

The publisher may implement a CMP in one of two ways:

1.	**Build:** Develop an in-house CMP that meets the technical requirements specified by IAB Europe and register as an official CMP using this form.
2.	**Outsource:** Rely on  the service of a CMP registered with IAB Europe and listed here as an official CMP. 

## What publisher controls are available? What happened to Pubvendors?<a name="pubvendors"></a>
The goal of pubvendors.json was to enable publisher control over their vendor relationships and data purposes but was ultimately found to be an incomplete and error-prone solution. 

In v2 of the TC String, a segment of information enables publishers to define restrictions. Another segment defines their vendor relationships in a list of allowed vendors. These publisher controls replace the pubvendors.json solutions and is to be deprecated after a transition phase for v2 implementation.

## The Global Vendor List<a name="gvl"></a>
Publishers should ask their partners (advertising vendors, DMPs, analytics vendors, etc.) to register on the Global Vendor List (GVL), if not already registered. The Global Vendor List is maintained with current registered vendors here. 

## Withdrawal of consent<a name="withdraw"></a>
Vendors must support the withdrawal of consent. Since consent is transmitted from publisher or CMPs to partners and vendors on each request, the publisher or CMP should provide a mechanism for users to withdraw consent. This mechanism may be as simple as collecting consent at each user session, or providing an option that enables the user to withdraw consent later. The UI for withdrawing consent should be the same as the UI by which consent was given.

# Vendor guidelines (DSPs, Agencies, DMPs)<a name="vendor"></a>
For vendors or media buyers registered in the Global Vendor List, these guidelines help you understand how to determine whether you have the necessary legal bases to process a user's personal data for the purposes you've disclosed in the GVL, based on the information contained in the TC String.

1.	In order to read or process user data in compliance with the TCF or store and/or access information on a user’s device in compliance with the TCF, vendors must be registered in the Global Vendor List. 
2.	Vendors should check consent for users from the EEA (EU + Norway + Island + Liechtenstein).
3.	Vendors should be able to identify traffic that falls under the GDPR.

The OpenRTB GDPR Advisory should be used to communicate user consent. Vendors can use the two extension fields, GDPR and CONSENT, in OpenRTB to determine action. 
		
## How do I find the TC String?<a name="findtcstring"></a>
If an impression is received server side (through openRTB for example), you should read the information from the TC data payload. For openRTB, technical specifications were updated to provide information on where and how the information is passed. For other non-standard server side delivery, clarify with the partner on how the TC data payload is passed.

When the impression is received client side (redirect, prebid, etc.), leverage the CMP to request and read the TC data. This information can be collected whether you are in the top parent page (using the __tcfapi method) or from an iframe (using postMessage method as defined by the CMP API technical specifications).

## How do I send the TC string?<a name="sendtcstring"></a>
For any server side call, if using openRTB, the consent payload should be sent according to the openRTB specs.

For any client side call, once the consent payload has been obtained leveraging the CMP, you can validate that it reflects user-intentful consent by checking the status of certain fields. For example:
- the field `cmpStatus` is `loaded`, and
- the field `eventStatus` is `tcloaded` or `useractioncomplete`

The status of these two fields as indicated above show that the CMP has been loaded and the user has engaged. After validating the TC data payload is suitable for your case, you should pass it in the ad call using the URL-passing macro solution detailed in documentation for the TC String.

## How to determine legal bases from the TC String?<a name="detlegalbasis"></a>
In order to determine if they have the necessary legal basis to process a user’s personal data for a specific purpose registered in the GVL, vendors must follow all relevant signals from the TC String in accordance with what they disclose in the GVL. 
The relevant signals in the TC string are the GVL version, the publisher restrictions signal, the purpose legal basis signal and the vendor legal basis signal.

Prior to processing a user’s personal data for a purpose registered in the GVL, for each purpose vendors must:

**Evaluate publisher restrictions** prior to any other signal:
1.  Check if the publisher completely disallowed processing based on this purpose using a purpose restriction 
2.  Check if the publisher restricted the applicable legal basis for this purpose using a legal basis restriction (e.g. the publisher only allows "consent" as legal basis for this purpose, or only allows "legitimate interest" as legal basis for this purpose):
    -  In the absence of a legal basis restriction, vendors must apply their default legal basis
    -  If there is a legal basis restriction vendors must apply the publisher defined legal basis, which is only allowed if that purpose is either declared with the allowed legal basis as default legal basis, or if that purpose was declared as flexible
    
In case the publisher disallows processing or in case the acceptable legal basis defined by the publisher in the restrictions is not registered by the vendor as default purpose nor is the vendor declaring that purpose as flexible, the vendor may not process personal data based on that purpose. For example, if a vendor registered legitimate interest as legal basis for a purpose and is not declaring legal basis for that purpose as flexible, it may not process in the presence of a legal basis restriction that requires consent.

**Evaluate purpose and vendor legal basis** 

After determining the applicable legal basis, vendors must then check:
1. the presence of a purpose legal basis signal for each purpose 
2. the presence of a vendor legal basis signal 

Only if both signals are positive for the applicable legal basis in the TC String may the vendor process for that purpose.

## How to determine if data may be transmitted?<a name="handletcstring"></a>
According to the policies of the Transparency and Consent Framework, a vendor may choose not to transmit data to another vendor for any reason, but a vendor must not transmit data to another vendor without a justified basis for relying on that vendor’s legal basis for processing the personal data. If a vendor has or obtains personal data and has no legal basis for the access to and processing of that data, the vendor should quickly cease collection and storage of the data and refrain from passing the data on to other parties, even if those parties have a legal basis. To determine if a vendor has at least one legal basis to process a user’s personal data [see "How to determine legal bases from the TC String?"](#detlegalbasis).

## Agency guidelines<a name="agencyguide"></a>
In addition to the vendor guidelines, agencies may want to consider the following details: 
- If you're handling any personal data, register as a vendor in the Global Vendor List. 
- Become familiar with the capabilities of your DSP partner(s) so that you only work with personal data when you have a legal basis to do so. Some of the following questions may help you get started:
	- Are your DSPs working with the TCF?
	- Are your DSPs reading the TC String passed through OpenRTB?
	- How are your DSP partners communicating transparency and consent and are they passing personal data only when there is a legal basis? How do they track these practices?

## DSP guidelines<a name="dspguide"></a>
In addition to vendor guidelines, DSPs should consider the following points:
- If you're handling any personal data, register as a vendor in the Global Vendor List. 
- Support ingesting transparency and consent signals on openRTB bid requests. 
- Decide how to handle bidding based on these signals, ensuring that processing of user data only occurs when there is a legal basis.

## DMP guidelines<a name="dmpguide"></a>
DMP in this document refers to enterprise software that can be used by publishers, marketers, agencies and third-party vendors to centralize marketing information associated with pseudonymous IDs. To take advantage of the Framework, DMPs should be registered to the Global Vendor List. For simplicity sake, we will assume the same guidelines apply for both buy-side focused and sell-side focused DMPs. While oriented towards different buyers, buy-side and sell-side DMPs centralize this data, enable forecasting and reporting, and often enable syndication to take-action systems (e.g., Publishers, DSPs, DCO vendors, and Site Optimization/Personalization vendors). 

## How does the TC String apply to non-OpenRTB situations?<a name="nonrtb"></a>
- Many requests for ad serving will include the TC String. 
- Some requests will be sent to vendors without a TC String, such as: publishers not implementing a CMP, server-initiated server-to-server data transfers such as syndication or CRM onboarding, and consumer opt-outs from centralized privacy pages such as AboutAds.info.
- When a visitor visits a publisher page with a CMP implemented, the first JavaScript that loads should be the CMP.js library. First time visitors are presented with a UI that offers choices to the user, which are then stored in a TC String. Return visitors need not see the UI again, and any associated TC String may be updated if the user changes any preferences.  
- Tag management containers should integrate CMP code. In addition to enriching ad calls, a CMP should also support calling a third-party tag management container that will handle robust tag logic already implemented on behalf of the publisher. 
- Syndication for buy-side DMPs centralizes marketing information associated with pseudonymous IDs, which enables marketers to improve their media planning, syndication and cross-vendor reporting. 
	- Syndication of audience segments is often initiated by a marketer ruleset to send information from the DMP to take-action systems (DSP, DCO, Site Optimization, etc.).
	- For GDPR purposes, the DMP maintains a server-side consent store that maintains the most recent consent state associated with its pseudonymous IDs. This server-side store is also useful for maintaining the audit log of signals received. 
	- Because the TC String maintains the current consent state for all vendors, the DMP can send only pseudonymous IDs with consent state=1 to recipient vendors.

# Consent Management Platform (CMP) guidelines<a name="cmp"></a>
This section outlines implementation guidelines for CMPs to be compliant with the TCF technical specification when collecting, storing and sharing user consent.

Register to be on the CMP list: https://register.consensu.org/ 
This step is required to be a TCF recognised CMP trusted by vendors receiving the consents that you collect. Upon registration a CMP is assigned an ID, which is passed with each request, and granted access to the “consensu.org” domain for accessing and modifying the global consent cookie.

## 1. Collecting consent from users<a name="collectconsent"></a>
The TCF defines a set of common purposes and features that vendors can act on. Vendors are responsible for providing up-to-date information on the purposes they support and the legal basis under which they wish to operate these purposes. This information is captured in the  Global Vendor List (GVL). 

For a given publisher, a CMP must (at least) collect the user consent for all purposes and vendors declared by the publisher. With the publisher agreement, a CMP can also collect consent for all purposes and vendors in the GVL.

A range of requirements on how consent must be presented, collected and stored can be found in the TCF policy document.

## 2. Sharing consent with vendors<a name="shareconsent"></a>
The TCF defines standard APIs and formats for communicating between CMPs collecting consent from end users and vendors embedded on a website or in a mobile application.
This API provides a unified interface for seamless interaction between the parties in the advertising industry.

As a CMP, you will need to:
- Collect consent from the end user that is compliant with the TCF Technical Specifications and Policy.
- Generate an encoded data string, the TC String, containing the set of preferences expressed by the user
- Share the TC String with vendors through the available APIs.

## 3. Storing Consent<a name="storeconsent"></a>
Depending on the publisher preference and on the policy requirements, consent can be stored either locally or globally. When storing the consent globally, the consent will be stored in a shared cookie with the “TC String” format on the “consensu.org” domain.

CMPs are free to also store consent separately and with a different format if they need to (first-party cookies, long term proof of consent storage, etc.) provided that – if consent is being stored globally – they keep the shared cookie up-to-date with their local changes.

For long-term storage, the following methods are common across CMPs:

Method | Pros | Cons
------------ | ------------- | -------------
Cookies | Easy to use and cheap. Fast and provide a good user experience. | Short-lived. Cannot be used as proof of consent. Third-party cookies might be blocked by browsers so web-wide consent can be hard to implement
Server-side storage | Long-lived. Can be used as proof of consent | Can be slow (use cookies/local storage as client-side cache). Requires a long-term ID (cookie ID or email or similar user ID)
Mobile: internal data storage / shared preferences | Easy to use and cheap. Fast and provide a good user experience | Cannot be used as proof of consent. Cannot be shared across apps so device-wide consent can be hard to achieve

You’ll usually want to go with a combination of server-side storage – for being able to store consent for a long time and share it across websites/apps – and a client-side storage like cookies or shared preferences – for a local fast-to-access cache.

## 4. Withdrawal of consent and other non-TCF policy <a name="withdrawconsent"></a>
Signals sent through the IAB Europe framework should only indicate what the user status is at the time of the signal creation and nothing else. While the CMP should also enable users to withdraw consent, the minimum requirement is to record the user's preference at the time the signal is created. Certain GDPR policy, such as portability and the right to be forgotten, is not covered in the IAB Europe TCF. CMPs and vendors should address other GDPR rights outside the TCF separately and on their own.

## 5. Encoding publisher restrictions <a name="pubrestrenc"></a>
In order to reduce the size of the TC string, CMPs are advised to store/provide publisher restrictions only when necessary to reflect the publisher's choice to restrict a vendor's processing of personal data. In terms of reflecting a publisher’s choice:

* In case a vendor has not been disclosed to the user via the CMP UI, there is no need to store restrictions for that vendor in the TC String. Given the vendor was not disclosed both vendor consent and vendor legitimate interest signals in the TC String can be left undefined which suffices to signal that the vendor may not process personal data.
* Purpose restrictions that disallow a vendor from processing personal data for a specific purpose only need to be stored in case the vendor was disclosed by the CMP (reflecting the restriction in the UI) and registered for that purpose in the GVL.
* Legal Basis restrictions are only needed in situations where the vendor was disclosed by the CMP (reflecting the restriction in the UI) and is declaring flexibility in the GVL for the corresponding purpose, meaning that:

    1. The vendor registered a purpose as legitimate interest (default legal basis), but also registered this purpose as flexible (i.e. also accepts consent as a legal basis). In this case a "require consent" restriction is needed to signal that the vendor may only process using consent as legal basis.
    2. The vendor registered a purpose as consent (default legal basis), but also registered this purpose as flexible (i.e. also accepts legitimate interest as a legal basis).  In this case a "require legitimate interest" restriction is needed to signal that the vendor may only process using legitimate interest as legal basis.
    
Note that the above does not preclude the use of efficient encoding/decoding schemes in certain scenarios. For example, in cases where a publisher wants to restrict a purpose for all vendors to consent, it might be more efficient to encode a small number of range restriction segments using a specific encoding scheme.

## 6. CMP interface requirements<a name="cmpreq"></a>
Please refer to the policies for the minimal information / functionality that needs to be shown on the first screen of the UI and the information that must be present on second/additional layers of the UI.

Additionally, all live CMP implementations must obfuscate their JavaScript code to help prevent misappropriation of CMP code

# How do vendors outside the RTB bidstream query a CMP?<a name="outsidertb"></a>
At a high level, all vendors need to query the CMP on the page to get access to consent information in the TC String, parse the consent data in the String, and gate usage of user data based on user consent. This lookup needs to be executed as close as possible to using the user data so that the latest value of consent is used.

1. **GVL registration:** Before you can work with a CMP, you need to be registered as a vendor. You can sign up to be added to the GVL on IAB Europe's registration site. 
2. **Query CMP:** Once added, you can query the CMP for consent information. Details about how to query the CMP are provided in the documentation for CMP API v2. Initiate consent query before applying workflow to reduce latency. 
3. **Determine data usage:** Parse the TC String for details on whether GDPR applies and the user's consent status for allowing the use of user's data. This consent can differ by purpose and by vendor.


## What if I don’t receive the TC string?
Unfortunately, if transparency or consent information is unavailable, you may not be able to process the user's data. 

## Does the policy make a difference between functional and marketing cookies? Do I need consent for functional cookies?
You may or may not depending on whether the scenario is covered by special features or special purposes. Review the policy documentation to learn more.

# Other Frequently Asked Questions<a name="otherfaq"></a>
## Are cookies required for working with the CMP API?<a name="cookiesrequired"></a>
Yes, v2 depends on the consent data being stored in cookies. 

Discussion on future iterations have led to proposals about storage mechanisms like a central registry that stores user IDs and their associated information. At that time the implementation could be updated to retrieve data from a defined source without having to change the interface. Until such mechanism exist, cookies are required for working with the CMP API. 

## What is the long-term plan for consent storage?<a name="futurestorage"></a>
A third-party cookie isn’t a long-term solution to auditable, permanent, user-keyed consent storage, and doesn’t work with browsers that block 3rd-party cookies or mobile apps. CMP’s should work towards standardizing a more future-looking server-side consent retrieval mechanism so that cookies might be used as more of a “consent caching” in the future.

## Can I also use the API for CCPA or other laws?<a name="ccpa"></a>
At this time, the IAB Europe Transparency and Consent Framework is designed for compliance with GDPR. The CMP API was designed to only support a special use case of the GDPR, which involves the use of user data in the context of digital advertising. Consult your local IAB or the IAB Tech Lab to learn more about other ongoing projects for privacy tool development.
## Related resources<a name="resources"></a>
A v2 consent string encoder/decoder can be found here: https://iabtcf.com/#/ as well as links to further implementation libraries.

### Will these FAQ be updated? <a name="updates"></a>
Yes, these guidelines will be updated as questions arise. A wiki with more dynamic content has been proposed, but timelines have not yet been determined.

### How can I learn more?<a name="learnmore"></a>
Join the working group, or stay tuned for build out of a wiki to support dynamic responses to questions from implementers.

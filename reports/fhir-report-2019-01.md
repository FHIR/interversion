# FHIR Foundation Report: Dec 2018 + Jan 2019

This is a combined report for December 2018 and Jan 2019. 

## FHIR R4

FHIR R4 was released (on schedule!) on Dec 29, though the release itself was 
a drawn out process and it was a little while before all the formal notifications 
happened. 

Preparing and releasing a new release of FHIR is a massive process
and hundreds of people contribute. I see that I talked about this 
in my last report as well, and we ended up making fairly minimal
changes to the credits page ([see comparison](https://services.w3.org/htmldiff?doc1=http%3A%2F%2Fhl7.org%2Ffhir%2FSTU3%2Fcredits.html&doc2=http%3A%2F%2Fhl7.org%2Ffhir%2Fcredits.html)).
Mainly, we dropped trying to recognise the list of individuals who 
contribute without committing directly to the source. It's just too big, 
but that that doesn't mean we don't appreciate them greatly. 

There will be a technical correction for R4 coming soon. Right now:

* there's at least one place in the narrative where I missed a claim that it's currently release 3 
* we found some erroneous FHIRPath expressions in the invariants 
* we have to update the normative pages to include ANSI approval, once this is finalised 


## FHIR R5

Most of the focus of the January HL7 meeting was setting the agenda for the R5 cycle 
(which is wider than just what will be in R5 itself). The discussions we had lead to
a formal R5 roadmap - see <https://onfhir.hl7.org/2019/01/20/fhir-r5-roadmap/>.

The R5 roadmap makes a general trend around FHIR very obvious. The FHIR life cycle
will broadly fall into 3 phases:

* Initiation - building the basic framework and the community, showing what can be done
* Consolidation - rounding out the formal standard, growing impact on the market 
* Maintenance - the formal specification is basically done (changes slow and difficult). Implementation stable

These are primarily social processes. You can note the similarities with [Tuckmans stages of development](https://en.wikipedia.org/wiki/Tuckman%27s_stages_of_group_development) 
and the [Structure of Scientific Revolutions](https://en.wikipedia.org/wiki/The_Structure_of_Scientific_Revolutions). Also note that the 
[Gartner hype cycle](https://www.gartner.com/en/research/methodologies/gartner-hype-cycle) is related to this basic process. 

I always thought of this as a 15-20 year cycle. At the end of the cycle, industry dissatisfaction 
with the status quo, and overall developments in informatics and technology will mean that a new standard
must arise to replace the moribund existing standard. It's my hope that when the time comes, someone 
with the energy and passion will stand up to make it happen (what a job that will be - the community
and scope of the work will be orders of magnitude larger than when I took on FHIR. We'll need a 
revolution in social media as well as informatics to power that). In the meantime, we're determined to 
see FHIR be as useful as possible while it has its day in the sun, and its use will last many decades, 
irrespective of whatever else happens. 

The publication of FHIR R4 completes our transition into the 2nd phase of the lifecycle,
and I think that's clear in the R5 roadmap: most of the energy in R5 itself will go into 
stabilising the resources (normative) and the really interesting things are what's happening
around the standard: 

* Adjunct standards: Smart App Launch, CDS Hooks, FHIRCast
* Building flow on communities: Genomics, Public Health, Integrated Clinical Research, Improved Financial Processes Patient/System Improvements + many more 

### R5 Timeline 

The roadmap also includes our intention to survey the market later this year with regard to the timeline for R5. 
Our normal cycle will lead to R5 being published late Q3 2020. Later this year, we'll survey the market 
with regard to whether we should continue on with this cycle. There's interest in several jurisdictions in 
driving convergence to R4, and concern that publishing R5 will not help with this. On the other hand, other
parties will be invested in fixes that we make in R5, and will want to move on. 

Some history on this - when we published R2, the argonaut vendors asked us to delay 
R3 from our normal cycle, so we started work on R2.1 - a patch that didn't change any 
argonaut related changes. But by the time we started working on R3, they'd changed 
their mind, and asked to go full speed ahead. So we never published R2.1

Processing that market feedback will be interesting...

## FHIR R3

We're also working on a technical correction for R3, mainly to fix FHIRPath statements for a few invariants, and the generated snapshots. If you are aware of implementation issues that need addressing in an R3 technical correction, please see the process announcement here: https://chat.fhir.org/#narrow/stream/179240-Announcements/topic/Technical.20corrections.20for.20FHIR.20R3

## FHIR Connectathon

For the first time, we had a decrease in numbers at the connectathon in USA:

![Connectathon Attendance](http://www.fhir.org/assets/images/connectathon-2019-01-trends.png)

The dip was partly due to the US Government Shutdown - but actually, most of the 
US government participants had separate funding streams and so were unaffected. So
it's a genuine dip. What it reflects, we believe, is the overall maturity of the 
specification - attendance is increasingly focused on the interesting things I mentioned
above. Here's a break down by track:

![Track Breakdown](http://www.fhir.org/assets/images/connectathon-2019-01-tracks.png)

Note that track participation is only loosely tracked, so these numbers are
indicative rather that precise. But the trend they show was clear at the connectathon.

## FHIR R2

While I'm iterating FHIR versions... a common question I get asked is when will the 
Argonaut vendors move on from R2. Of course, it's not for me to say. It's a discussion
between the vendors, their customers, and ONC as the relevant regulator. A 
significant formal round of consultations in that onging discussion is about to 
happen, so if you're interested on that question, keep a close eye on ONC requests 
for comment. It seems as though the discussion will be around how hard and fast 
ONC pushes implementers to migrate to R4 vs converting at R2 first. 

I note, though, that some of the US vendors are certified at R3, and the large 
argonaut vendors have R3 endpoints as well R2 for some of the resources.

## Implementation Guidance

In the R5 roadmap, I said that our focus was "implementation guidance" for things like 
genomics, public health etc. That's bigger than just Implementation Guides, though it 
includes that. The most important thing of the many activities that the FHIR community
is working on this year is to build out a well trodden path that covers 
identifying opportunities for process disruption/improvement through data exchange, 
and then initiating a community, building it out, prototyping solutions, and 
embedding them into the market. That implies support from published implementation
guides, but also tooling support for building communities, along with well trodden
paths with clear expectations for governance, and relationships with industry,
academia and regulatory authorities. And all of this is needed in many countries,
each with their own culture and challenges.

That, of course, is the core mission of the FHIR Foundation - but as you know,
we haven't really been executing on that. Your support has been crucial to get us
to this point, but this is the year that we need to turn that need into action. 
Making this happen - and figuring out how to best drive it - is a core focus for
both HL7 and the FHIR leadership.

The FHIR process has been becoming increasingly bi-modal - 9-12 months focusing
on building implementation and community, and 9-12 months getting a new release 
out. So we're back to focusing on implementation. Actually, R4 was a big release; 
our hope is that the stabilization of the core means R5 won't be so consuming, and 
our focus will less distracted from supporting implementation. 

Technically, we need to bed down the Implementation Guide publishing process.
It works now, but we need to decrease the amount of learning required to get
an implementation guide out. We have several paths towards that, and we're chasing
all of them. Watch for updates on this through the first half of this year.

## Converting between all the standards

FHIR (R2/R3/R4). (C)CDA documents. V2 messages. openEHR/EN13606. If you're like any normal implementer,
your information environment includes the same information represented in most or all these
formats (and many more). FHIR is nice but even if we're converging on it, all those other 
formats will always be around. Overall, the whole problem is still a disaster, and we're all bleeding on this. 
This is a strong message HL7 is getting, and we don't have to listen hard. 

Well, we're doing something about it. What we want is simple: 

* portable transforms, so that we can share work and build economy of scale
* transforms that normal people can contribute to (not uber-experts)

Also, we'd like to have clients in the major implementation languages (javascript, java, and C# at least)
that support the Smart App Launch protocol seamlessly, and that connect to R2, R2 and R4 servers for 
the patient core resources transparently to the application.

This is a very important area for us (and a number of our supporting organizations, including ONC).
So you'll definitely see some progress on this in the next few months. In particular, there 
are formal work streams for CDA<->FHIR and v2<->FHIR mapping now (see <https://chat.fhir.org/#narrow/stream/179273-CCDA-.2F.20FHIR.20mapping.20stream>
and <https://chat.fhir.org/#narrow/stream/179188-v2-to.20FHIR> + see the new HL7 email list v2-to-fhir@lists.hl7.org - under O-O on the HL7 listservs page).

FHIR itself includes 2 related resources:

* ConceptMap - mapping between codes in different terminologies
* StructureMap - formal transform language between directed-acyclic graphs (with associated ['Mapping Language'](http://hl7.org/fhir/mapping-language.html))

Both of these are very useful, though the complexity of the mapping process challenges 
everybody. But they don't begin to deal with the most difficult part of the mapping process,
which is wrangling with the record identification/matching process.

There's mappings using these resources for R2<->R3 and R3<->R4 published in the standard. 
These are being moved into the github repository <https://github.com/FHIR/interversion> for
ongoing maintenance. That repository generally will be home of the foundational resources for 
our ongoing work in V2/CDA/FHIR RX implementation support, so worth watching. 

There's additional technical work going on:

* using the FHIR definition framework to define V2 and CDA (and even to publish CDA implementation guides)
* using the FHIR validator for validating v2 messages and CDA documents
* defining a spec for a conversion engine that delivers on portable conversion logic in a useful way. 

These things are work in process - I will draw your attention to outcomes in future monthly notes. 

## Future Events

* [FHIR Training Course](https://fire.ly/training/hl7-fhir-overview-course/), 11-12 Mar, Chicago, IL, USA (Firely)
* FHIR Training Course (in Dutch), 25-26 Mar, Amsterdam, NL (Firely)
* FHIR Overview Training Course (in English), 1-2 Apr, Brussels, BE (IHE Belgium)
* [FHIR DevDays USA](https://www.devdays.com/us/), 10-12 June, Redmond, WA, USA (HL7 / FHIR Foundation)

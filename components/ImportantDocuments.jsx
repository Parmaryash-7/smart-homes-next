import React from "react";

const Section = ({ title, documents }) => (
    <div className="inner-flex inner-flex-medium">
        <div className="section-title text-center">
            <h2 className="highlight-color">{title}</h2>
        </div>
        <div className="three-col-grid">
            {documents?.map((data, index) => (
                <div className="white-bg" key={index}>
                    <a href={data.pdf} target="_blank" rel="noopener noreferrer">
                        <div className="inner-flex gap0" style={{ height: "100%" }}>
                            <div style={{ height: "100%", minHeight: "22rem" }} className="flex-row">
                                <img
                                    src="/images/pdf-img.png"
                                    alt=""
                                    style={{ width: "60%", margin: "auto" }}
                                />
                            </div>
                            <div
                                className="section-content news-pdf-name text-center"
                                style={{ padding: "0.5rem", minHeight: "4.75rem" }}
                            >
                                <p>{data.name}</p>
                            </div>
                        </div>
                    </a>
                </div>
            ))}
        </div>
    </div>
);

const ImportantDocuments = ({
}) => {
    const documentsPdf = [{
        pdf: "/images/document-pdf/dholera-sir-draft-development-plan.pdf",
        name: "Dholera-SIR-Draft- Development-Plan",
    },
    {
        pdf: "/images/document-pdf/dholera-sir-draft-gdcr.pdf",
        name: "Dholera-SIR-Draft-GDCR",
    },
    {
        pdf: "/images/document-pdf/dholera-sir-final-proposed-land-use-plan.pdf",
        name: "Dholera-SIR-Final-Proposed-Land-use-Plan",
    },
    {
        pdf: "/images/document-pdf/dholera-smart-city-master-plan.pdf",
        name: "Dholera-Smart-City-Master-Plan ",
    },
    {
        pdf: "/images/document-pdf/dholera-smart-city-overview.pdf",
        name: "Dholera-Smart-City-Overview",
    },
    {
        pdf: "/images/document-pdf/gidb-notification-dholerasir.pdf",
        name: "GIDB-Notification-DholeraSIR ",
    },
    {
        pdf: "/images/document-pdf/mega-projects-dholerasir-gujarat.pdf",
        name: "Mega-Projects-Dholerasir-Gujarat ",
    },
    {
        pdf: "/images/document-pdf/prelim-dholerasir-town-planning-2A.pdf",
        name: "Prelim-Dholerasir-Town-Planning-2A ",
    },
    {
        pdf: "/images/document-pdf/prelim-dholerasir-town-planning-4A-OPFP.pdf",
        name: "Prelim-Dholerasir-Town-Planning-4A-OPFP",
    },
    {
        pdf: "/images/document-pdf/Env_Clearance-Expressway_Dholera.pdf",
        name: "Env_Clearance Expressway_Dholera",
    },
    {
        pdf: "/images/document-pdf/PreFeasibilityReport_EW.pdf",
        name: "PreFeasibilityReport_EW",
    },
    {
        pdf: "/images/document-pdf/Draft-DPR-for-development-of-Dholera-Solar-Park.pdf",
        name: "Draft DPR for development of Dholera Solar Park",
    }
    ]
    const documentsPdfAirport = [{
        pdf: "/images/document-pdf/dholera-International-airport/2014-12-31_132.pdf",
        name: "Dholera International Airport Company Limited",
    },
    {
        pdf: "/images/document-pdf/dholera-International-airport/2016-5-26_561.pdf",
        name: "Dholera Airport",
    }
    ]
    const documentsPdfCirculars = [{
        pdf: "/images/document-pdf/dholera-circulars/dholera-sir-notification.pdf",
        name: "Dholera SIR Notification",
    },
    {
        pdf: "",
        name: "Gujarat Government Circular for Airport",
    },
    {
        pdf: "/images/document-pdf/dholera-circulars/dsirda-land-use-plan.pdf",
        name: "DSIRDA Final Proposed Land Use Plan",
    },
    {
        pdf: "/images/document-pdf/dholera-circulars/final-dp.pdf",
        name: "Dholera SIR Final Development Plan",
    }
    ]
    const documentsPdfDraftTown3_4 = [{
        pdf: "",
        name: "Government Gazette TP Scheme 3-4",
    },
    {
        pdf: "/images/document-pdf/draft-town-planning-scheme-3-and-4/DTPS-3-OP-FP PLAN.pdf",
        name: "DTPS 3 - Original Plot and Final Plot Plan",
    },
    {
        pdf: "/images/document-pdf/draft-town-planning-scheme-3-and-4/DTPS-4-OP-FP PLAN.pdf",
        name: "DTPS 4 - Original Plot and Final Plot Plan",
    }
    ]
    const documentsPdfDraftTown5_6 = [{
        pdf: "",
        name: "Government Gazette TP Scheme 5-6",
    },
    {
        pdf: "/images/document-pdf/draft-town-planning-scheme-5-and-6/dtps-5-op-fp.pdf",
        name: "DTPS 5 - Original Plot and Final Plot Plan",
    },
    {
        pdf: "/images/document-pdf/draft-town-planning-scheme-5-and-6/dtps-6-op-fp.pdf",
        name: "DTPS 6 - Original Plot and Final Plot Plan",
    }
    ]
    const documentsPdfSanctioned_3 = [{
        pdf: "/images/document-pdf/sanctioned-dholera-town-planning-3/notification-dtps-3.pdf",
        name: "Notification DTPS 3",
    },
    {
        pdf: "/images/document-pdf/sanctioned-dholera-town-planning-3/op-fp-plan-dtps-3.pdf",
        name: "Original Plot and Final Plot Plan DTPS 3",
    },
    {
        pdf: "",
        name: "Final Plot Plan DTPS 3",
    }

    ]
    const documentsPdfSanctioned_4 = [{
        pdf: "/images/document-pdf/sanctioned-dholera-town-planning-4/notification-dtps-4.pdf",
        name: "Notification DTPS 4",
    },
    {
        pdf: "/images/document-pdf/sanctioned-dholera-town-planning-4/op-fp-plan-dtps-4.pdf",
        name: "Original Plot and Final Plot Plan DTPS 4",
    },
    {
        pdf: "",
        name: "Final Plot Plan DTPS 4",
    }

    ]
    const documentsPdfSanctioned_5 = [{
        pdf: "/images/document-pdf/sanctioned-dholera-town-planning-5/notification-dtps-5.pdf",
        name: "Notification DTPS 5",
    },
    {
        pdf: "/images/document-pdf/sanctioned-dholera-town-planning-5/op-fp-plan-dtps-5.pdf",
        name: "Original Plot and Final Plot Plan DTPS 5",
    },
    {
        pdf: "",
        name: "Final Plot Plan DTPS 5",
    }

    ]
    const documentsPdfSanctioned_6 = [{
        pdf: "/images/document-pdf/sanctioned-dholera-town-planning-6/notification-dtps-6.pdf",
        name: "Notification DTPS 6",
    },
    {
        pdf: "",
        name: "Original Plot and Final Plot Plan DTPS 6",
    },
    {
        pdf: "/images/document-pdf/sanctioned-dholera-town-planning-6/fp-plan-dtps-6.pdf",
        name: "Final Plot Plan DTPS 6",
    }

    ]




    return (
        <div className="important-documents-wrapper">
            <section className="reecosys-section section-padding" id="reecosys-blog-section-3">
                <div className="main-container inner-flex inner-flex-big">
                    <Section title="Dholera SIR Important Documents" documents={documentsPdf} />
                    <Section title="Dholera International Airport" documents={documentsPdfAirport} />
                    <Section title="Dholera Circulars" documents={documentsPdfCirculars} />
                    <Section title="Draft Town Planning Scheme 5 and 6" documents={documentsPdfDraftTown5_6} />
                    <Section title="Sanctioned Dholera Town Planning 3" documents={documentsPdfSanctioned_3} />
                    <Section title="Sanctioned Dholera Town Planning 4" documents={documentsPdfSanctioned_4} />
                    <Section title="Sanctioned Dholera Town Planning 5" documents={documentsPdfSanctioned_5} />
                    <Section title="Sanctioned Dholera Town Planning 6" documents={documentsPdfSanctioned_6} />
                </div>
            </section>
        </div>
    );
};

export default ImportantDocuments;

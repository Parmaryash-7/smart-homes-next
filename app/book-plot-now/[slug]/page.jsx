import React from "react";
// import BookPlotNowComponent from "../../../components/BookPlotNow";
import { notFound, redirect } from "next/navigation";
// import api from "../../../lib/api.interceptor";
// import unitListJson from "data/unitlist.json";

export const dynamic = "force-dynamic";

export default async function BookPlotNowPage({ params }) {
    const { slug } = params;

    redirect(`/${slug}`)

    // const unitList = unitListJson.unit_list.filter((unit) => unit.slug === slug);
    // if (!unitList || unitList.length === 0) {
    //     notFound();
    // }

    // const selectedProject = unitList[0];

    // global.masterIds = {
    //     project_id: selectedProject.project_id,
    //     logged_in_master_user_id: 339,
    // };

    // let projectUnits;
    // try {
    //     const unitAreasData = await api.ProjectUnitAllList();
    //     projectUnits = unitAreasData?.data || [];
    //     console.log(projectUnits);
    // } catch (error) {
    //     console.error("Error fetching project units:", error);
    //     notFound();
    // }

    // return (
    //     <BookPlotNowComponent
    //         slug={slug}
    //         unitcordsList={unitList}
    //         projectUnits={projectUnits}
    //     />
    // );
}

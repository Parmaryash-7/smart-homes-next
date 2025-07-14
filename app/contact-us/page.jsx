import ContactUs from "components/ContactUs";
import api from "lib/api.interceptor";
// import getPageList from "lib/PageList";
import getContactDetails from "lib/ContactDetail";

export default async function ContactUsPage() {
    // const pageList = await getPageList();
    const pageList = await api.PageList();
    const contactDetails = await api.ContactFData();

    // const contactDetails = await getContactDetails();

    return (
        <ContactUs
            pageList={pageList}
            contactDetails={contactDetails}
        />
    );
}

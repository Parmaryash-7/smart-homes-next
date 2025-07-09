import ContactUs from "components/ContactUs";
import getPageList from "lib/PageList";
import getContactDetails from "lib/ContactDetail"; 

export default async function ContactUsPage() {
    const pageList = await getPageList();
    const contactDetails = await getContactDetails(); 

    return (
        <ContactUs
            pageList={pageList}
            contactDetails={contactDetails}
        />
    );
}

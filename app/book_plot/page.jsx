import dynamic from 'next/dynamic';
import api from 'lib/api.interceptor'
// import getPropertyList from 'lib/PropertList';
// import getCompletedPropertyList from 'lib/CompletedPropertyList';

// Dynamically import the client component
const BookPlot = dynamic(() => import('components/BookPlot'), { ssr: false });

export default async function BookPlotPage({ searchParams }) {


    // const propertylist = await getPropertyList();
    // const completedPropertylist = await getCompletedPropertyList();

    const propertylist = await api.Propertylist();
    const completedPropertylist = await api.CompletedPropertyList();

    return (
        <BookPlot
            propertylist={propertylist}
            completedPropertylist={completedPropertylist}
            searchParams={searchParams}
        />
    );
}

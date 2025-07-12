import dynamic from 'next/dynamic';
import getPropertyList from 'lib/PropertList';
import getCompletedPropertyList from 'lib/CompletedPropertyList';

// Dynamically import the client component
const BookPlot = dynamic(() => import('components/BookPlot'), { ssr: false });

export default async function BookPlotPage({ searchParams }) {
    const propertylist = await getPropertyList();
    const completedPropertylist = await getCompletedPropertyList();

    return (
        <BookPlot
            propertylist={propertylist}
            completedPropertylist={completedPropertylist}
            searchParams={searchParams}
        />
    );
}

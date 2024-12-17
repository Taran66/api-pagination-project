// import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import { DataTable } from 'primereact/datatable';
// import { Column } from 'primereact/column';
// import { useParams } from 'react-router-dom';
// import 'primereact/resources/themes/saga-blue/theme.css';
// import 'primereact/resources/primereact.min.css';
// import 'primeicons/primeicons.css';

// interface Artwork {
//     title: string;
//     place_of_origin: string;
//     artist_display: string;
//     inscription: string;
//     date_start: string;
//     date_end: string;
// }

// const Table: React.FC = () => {

//     const { pageNumber = '1' } = useParams<{ pageNumber: string }>();
//     const [artworks, setArtworks] = useState<Artwork[]>([]);
//     const [loading, setLoading] = useState<boolean>(true);


//     useEffect(() => {
//         setLoading(true);
//         fetch(`https://api.artic.edu/api/v1/artworks?page=${pageNumber}`)
//             .then((response) => response.json())
//             .then((data) => {
//                 setArtworks(data.data);
//                 setLoading(false);
//             })
//             .catch((error) => {
//                 console.error('Error fetching data:', error);
//                 setLoading(false);
//             });
//     }, [pageNumber]);

//     const columns = [
//         { field: 'title', header: 'Title' },
//         { field: 'place_of_origin', header: 'Place of Origin' },
//         { field: 'artist_display', header: 'Artist' },
//         { field: 'inscription', header: 'Inscription' },
//         { field: 'date_start', header: 'Start Date' },
//         { field: 'date_end', header: 'End Date' }
//     ];

//     return (
//         <div>
//             <DataTable value={artworks} showGridlines paginator rows={5} rowsPerPageOptions={[5, 10, 15, 20, 25]} loading={loading} tableStyle={{ minWidth: '80rem', minHeight: '50rem' }}>
//                 {columns.map((col) => (
//                     <Column key={col.field} field={col.field} header={col.header} style={{ width: '16%' }} />
//                 ))}
//             </DataTable>
//             <div>
//             <div className="pagination-controls">
//                 {[1, 2, 3, 4, 5].map((page) => (
//                     <Link key={page} to={`/artworks/page/${page}`} style={{ marginRight: '10px' }}>
//                         Page {page}
//                     </Link>
//                 ))}
//             </div>    
//             </div>
//         </div>
//     );
// };

// export default Table;


import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useParams } from 'react-router-dom';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { OverlayPanel } from 'primereact/overlaypanel';

interface Artwork {
    title: string;
    place_of_origin: string;
    artist_display: string;
    inscription: string;
    date_start: string;
    date_end: string;
}

const Table: React.FC = () => {

    const op = useRef<OverlayPanel>(null);

    const { pageNumber = '1' } = useParams<{ pageNumber: string }>();
    const [artworks, setArtworks] = useState<Artwork[]>([]);
    const [selectedArtworks, setSelectedArtworks] = useState<Artwork[]>([]);
    const [rowsToSelect, setRowsToSelect] = useState<number>(0)
    const [loading, setLoading] = useState<boolean>(true);


    useEffect(() => {
        setLoading(true);
        fetch(`https://api.artic.edu/api/v1/artworks?page=${pageNumber}`)
            .then((response) => response.json())
            .then((data) => {
                setArtworks(data.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
                setLoading(false);
            });
    }, [pageNumber]);

    const columns = [
        { field: 'title', header: 'Title' },
        { field: 'place_of_origin', header: 'Place of Origin' },
        { field: 'artist_display', header: 'Artist' },
        { field: 'inscription', header: 'Inscription' },
        { field: 'date_start', header: 'Start Date' },
        { field: 'date_end', header: 'End Date' }
    ];

    return (
        <div>
            <DataTable value={artworks} showGridlines paginator rows={5} rowsPerPageOptions={[5, 10, 15, 20, 25]} loading={loading} tableStyle={{ minWidth: '80rem', minHeight: '50rem' }}>
                {columns.map((col) => (
                    <Column key={col.field} field={col.field} header={col.header} style={{ width: '16%' }} />
                ))}
            </DataTable>
            <div>
            <div className="pagination-controls">
                {[1, 2, 3, 4, 5].map((page) => (
                    <Link key={page} to={`/artworks/page/${page}`} style={{ marginRight: '10px' }}>
                        Page {page}
                    </Link>
                ))}
            </div>    
            </div>
        </div>
    );
};

export default Table;



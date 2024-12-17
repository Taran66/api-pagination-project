import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useParams } from 'react-router-dom';
import { OverlayPanel } from 'primereact/overlaypanel';
import { Button } from 'primereact/button';

interface Artwork { // Defining the structure and datatypes of the fields
    id: string;
    title: string;
    place_of_origin: string;
    artist_display: string;
    inscription: string;
    date_start: string;
    date_end: string;
}

const Table: React.FC = () => {
    const op = useRef<OverlayPanel>(null);  // reference to the OverlayPanel for using the methods

    const { pageNumber = '1' } = useParams<{ pageNumber: string }>();  // useParams to fetch the page number from the url
    const [artworks, setArtworks] = useState<Artwork[]>([]);
    const [selectedArtworks, setSelectedArtworks] = useState<Artwork[]>([]);
    const [rowsToSelect, setRowsToSelect] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(true);
    const [totalRecords, setTotalRecords] = useState<number>(0);

    useEffect(() => {
        setLoading(true);
        fetch(`https://api.artic.edu/api/v1/artworks?page=${pageNumber}`)    // fetching the data for displaying the data
            .then((response) => response.json())
            .then((data) => {
                setArtworks(data.data); // getting data from the api and storing it in state
                setTotalRecords(data.pagination.total); // storing the total number of records in a state
                setLoading(false);
            })
            .catch((error) => {  // error handling
                console.error('Error fetching data:', error);
                setLoading(false);
            });
    }, [pageNumber]);

    const fetchPage = async (page: number): Promise<Artwork[]> => { // dynamically fetching data for selecting the desired number of rows as intended
        const response = await fetch(`https://api.artic.edu/api/v1/artworks?page=${page}`);
        const data = await response.json();
        return data.data;
    };

    const handleSelectRows = async () => {  // function to handle the selected rows
        let rowsToSelectRemaining = rowsToSelect; 
        let selectedRows: Artwork[] = [];
        let currentPage = parseInt(pageNumber, 10);

        while (rowsToSelectRemaining > 0 && selectedRows.length < totalRecords) {  // while loop to get the remaining rows which are left before the rows which are paginated on the previous set of rows are previous page
            const fetchedRows = await fetchPage(currentPage);
            const rowsToAdd = fetchedRows.slice(0, rowsToSelectRemaining); // rows to be added to the next page
            selectedRows = [...selectedRows, ...rowsToAdd];
            rowsToSelectRemaining -= rowsToAdd.length;
            currentPage++;   //incrementing the page for selecting the rows on the next page
        }

        setSelectedArtworks((prev) => [...new Set([...prev, ...selectedRows])]);
        op.current?.hide();  //hiding the overlay when submission is done
    };

    const onSelectionChange = (e: any) => { // function to select the rows
        setSelectedArtworks(e.value);
    };

    const columns = [ // defining the headers of the table
        { field: 'title', header: 'Title' },
        { field: 'place_of_origin', header: 'Place of Origin' },
        { field: 'artist_display', header: 'Artist' },
        { field: 'inscription', header: 'Inscription' },
        { field: 'date_start', header: 'Start Date' },
        { field: 'date_end', header: 'End Date' },
    ];

    return (
        <div>
            <Button
                icon="pi pi-chevron-down" // chevron icon for selecting the number of rows to be selected
                onClick={(e) => op.current?.toggle(e)} // using the toggle method of OverlayPanel to toggle the panel
            />
            <DataTable
                value={artworks}
                selectionMode="checkbox"
                selection={selectedArtworks}
                onSelectionChange={onSelectionChange}  // trigger for setting the selected rows
                dataKey="id"
                showGridlines
                paginator
                rows={5}   // default rows
                rowsPerPageOptions={[5, 10, 15, 20, 25]}  // Selections for how many rows user want to see on the screen at a time
                loading={loading}
                tableStyle={{ minWidth: '80rem', minHeight: '50rem' }}
            >
                <Column selectionMode="multiple" headerStyle={{ width: '3em' }} />
                {columns.map((col) => (  // mapping over the columns to create the table headers and fields
                    <Column key={col.field} field={col.field} header={col.header} style={{ width: '16%' }} />
                ))}
            </DataTable>
            <OverlayPanel   // OverlayPanel for selecting the number of rows to be selected
                ref={op} // reference for using methods in OverlayPanel
                style={{ width: '300px' }}
                className="custom-overlay"
                dismissable={true}
                showCloseIcon={true}
            >
                <div>
                    <input
                        type="number"
                        value={rowsToSelect}
                        onChange={(e) => setRowsToSelect(Number(e.target.value))}  // onChange trigger to store the number of rows to be selected inside a state
                        min={1} //minimum limit
                        max={totalRecords}  // maximum limit
                    />
                    <Button label="Submit" onClick={handleSelectRows} />
                </div>
            </OverlayPanel>
            <div>
                <div className="pagination-controls">
                    {[1, 2, 3, 4, 5].map((page) => ( // routing for the desired page for the user using Link tag of react router dom
                        <Link key={page} to={`/artworks/page/${page}`} style={{ marginRight: '10px' }} className="p-button p-button-text">
                            <Button label={`Page ${page}`} rounded />
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Table;

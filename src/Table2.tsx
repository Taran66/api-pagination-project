import React, { useEffect, useState, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Checkbox } from 'primereact/checkbox';
import { OverlayPanel } from 'primereact/overlaypanel';
import { Button } from 'primereact/button';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';


interface Artwork {
    id: number;
    title: string;
    place_of_origin: string;
    artist_display: string;
}

const Table: React.FC = () => {

    const op = useRef<OverlayPanel>(null);

    const [artworks, setArtworks] = useState<Artwork[]>([]);
    const [selectedArtworks, setSelectedArtworks] = useState<Artwork[]>([]);
    const [rowsToSelect, setRowsToSelect] = useState<number>(0);
    
    useEffect(() => {
        fetch('https://api.artic.edu/api/v1/artworks?page=1')
            .then((response) => response.json())
            .then((data) => {
                setArtworks(data.data);
            });
    }, []);

    const onSelectionChange = (e: any) => {
        setSelectedArtworks(e.value);
    };

    const handleSelectRows = () => {
        const newSelections = artworks.slice(0, rowsToSelect);
        setSelectedArtworks(prev => [...new Set([...prev, ...newSelections])]);
        op.current?.hide()
    };

    return (
        <div>
            <Button 
                icon="pi pi-chevron-down" 
                onClick={(e) => op.current?.toggle(e)}
            />
            <DataTable 
                value={artworks} 
                selectionMode="checkbox" 
                selection={selectedArtworks} 
                onSelectionChange={onSelectionChange}
                dataKey="id"
                paginator
                rows={5}
            >
                <Column selectionMode="multiple" headerStyle={{ width: '3em' }} />
                <Column field="title" header="Title" />
                <Column field="place_of_origin" header="Place of Origin" />
                <Column field="artist_display" header="Artist" />
            </DataTable>
            <OverlayPanel 
                ref={op}
                style={{width: '300px'}}
                className='custom-overlay'
                dismissable={true}
                showCloseIcon={true}
            >
                <div>
                    <input 
                        type="number" 
                        value={rowsToSelect} 
                        onChange={(e) => setRowsToSelect(Number(e.target.value))}
                        min={1}
                        max={artworks.length}
                    />
                    
                    <Button label="Submit" onClick={handleSelectRows} />
                </div>
            </OverlayPanel>
        </div>
    );
};

export default Table;

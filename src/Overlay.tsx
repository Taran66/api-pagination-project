import React, { useRef } from 'react';
import { OverlayPanel } from 'primereact/overlaypanel';
import { Button } from 'primereact/button';

const OverlayPanelToggleDemo: React.FC = () => {
    // Create a reference for the OverlayPanel
    const op = useRef<OverlayPanel>(null);

    return (
        <div>
            {/* Button to toggle the OverlayPanel */}
            <Button 
                type="button" 
                label="Toggle Overlay" 
                onClick={(e) => op.current?.toggle(e)} 
                className="p-button-primary"
            />

            {/* OverlayPanel Component */}
            <OverlayPanel ref={op} style={{ width: '300px' }} dismissable>
                <p>This is content inside the overlay panel.</p>
                <Button 
                    type="button" 
                    label="Close Overlay" 
                    onClick={() => op.current?.hide()} 
                    className="p-button-secondary"
                />
            </OverlayPanel>
        </div>
    );
};

export default OverlayPanelToggleDemo;

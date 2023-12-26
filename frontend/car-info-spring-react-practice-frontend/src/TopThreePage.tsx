import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useState } from "react";
import { TopThreeElement, getTopThreeElementsByFeature } from "./api";
import { FeatureSelectionPage } from "./FeatureSelectionPage";
import './TopThreePage.css'

export type Props = { onBack: () => void };

export function TopThreePage(props: Props) {
    const [topThreePageIsOpen, setTopThreePageIsOpen] = useState(true);
    const [featureSelectionIsOpen, setFeatureSelectionIsOpen] = useState(false);
    const [topThreeElements, setTopThreeElements] = useState<[] | TopThreeElement[]>([])
    const [feature, setFeature] = useState("model");

    const tableColumns: GridColDef[] = [
        {
            field: 'name', headerName: 'Feature', width: 400,
            valueGetter: (params) => {
                if (!params.value) {
                    return "N/A";
                }
                return params.value;
            }
        },
        {
            field: 'count', headerName: 'Person count', width: 200,
            valueGetter: (params) => {
                if (!params.value) {
                    return "N/A";
                }
                return params.value;
            }
        }
    ];

    function showTopThree() {
        getTopThreeElementsByFeature(feature).then(body => {
            setTopThreeElements([]);
            Object.entries(body.data).map(entry => {
                setTopThreeElements(topThreeElements => [...topThreeElements, 
                    { id: entry[0], feature: feature, name: entry[0], count: entry[1] }])
            });
        })
    }

    function handleClickOnFeatureSelection() {
        setFeatureSelectionIsOpen(true);
        setTopThreePageIsOpen(false);
    }

    function handleFeatureSelection(selectedFeature: string) {
        setFeature(selectedFeature);
        setFeatureSelectionIsOpen(false);
        setTopThreePageIsOpen(true);
    }

    function handleClickOnReset() {
        setFeature("model");
        setTopThreeElements([]);
    }

    return (
        <>
            { topThreePageIsOpen ? 
                <>
                    <h2>Top Three Elements by Feature</h2>
                    <div className="box">
                        <button onClick={ handleClickOnFeatureSelection }>{ feature }</button>
                        <button onClick={ handleClickOnReset }>Reset</button>
                        <button
                            disabled={ feature === "" }
                            onClick={ showTopThree }>Show results</button>
                        <button onClick={ props.onBack }>Back</button><br /><br />
                    </div>

                    <div>
                        { topThreeElements !== null ? 
                            <div className="whitetable">
                                <DataGrid
                                    rows={ topThreeElements }
                                    columns={ tableColumns }
                                    initialState={{ pagination: { paginationModel: { page: 0, pageSize: 10 }, }, }}
                                    pageSizeOptions={[10]}
                                />
                            </div> : null }
                    </div>

                    <div>
                        <p>Select feature via click on first button.</p>
                        <p>Please note: top three shows more than 3 elements in case of equal counts.</p>
                    </div>
                </>
            : null }
            { featureSelectionIsOpen ? <FeatureSelectionPage onSelect={ handleFeatureSelection } /> : null }
        </>
    )
}
import { useState } from "react";
import { DataGrid, GridColDef, GridRowParams } from "@mui/x-data-grid";
import { Car, getCarInfoByFullTextSearch } from "./api";
import { Credentials } from "./Credentials";
import './Datagrid.css'
import { CarDataPage } from "./CarDataPage";

type Props = { creds: Credentials; onBack: () => void };

export function FullTextCarSearchPage(props: Props) {
    const [fullTextSearchPageIsOpen, setFullTextSearchPageIsOpen] = useState(true);
    const [fullText, setFullText] = useState("");
    const [id, setId] = useState("");
    const [model, setModel] = useState("");
    const [brand, setBrand] = useState("");
    const [indicator, setIndicator] = useState("");
    const [modelFamily, setModelFamily] = useState("");
    const [launchDate, setLaunchDate] = useState("");
    const [modelYear, setModelYear] = useState("");
    const [developmentType, setDevelopmentType] = useState("");
    const [modelStatus, setModelStatus] = useState("");
    const [segment, setSegment] = useState("");
    const [carBodyType, setCarBodyType] = useState("");
    const [carBodySpecification, setCarBodySpecification] = useState("");
    const [engineType, setEngineType] = useState("");
    const [carProject, setCarProject] = useState("");
    const [limitation, setLimitation] = useState("");
    const [uuid, setUuid] = useState("");
    const [sisterModelOne, setSisterModelOne] = useState("");
    const [sisterModelTwo, setSisterModelTwo] = useState("");
    const [modelType, setModelType] = useState("");
    const [baseCar, setBaseCar] = useState("");
    const [cars, setCars] = useState<null | Car[]>(null);
    const [allFiltersAreOpen, setAllFiltersAreOpen] = useState(false);
    const [idOfCarClickedByUser, setIdOfCarClickedByUser] = useState(-1);

    const tableColumns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 75 },
        { field: 'model', headerName: 'Model', width: 400 },
        { field: 'brand', headerName: 'Brand', width: 200 }
    ]

    function handleClickOnRow(params: GridRowParams) {
        setFullTextSearchPageIsOpen(false);
        setIdOfCarClickedByUser(params.row.id);
    }

    function handleClickOnShowResults() {
        getCarInfoByFullTextSearch(props.creds, fullText, id, model, brand, indicator, modelFamily, launchDate, modelYear,
            developmentType, modelStatus, segment, carBodyType, carBodySpecification, engineType, carProject, limitation, uuid,
            sisterModelOne, sisterModelTwo, modelType, baseCar)
            .then(body => setCars(body.data));
    }

    function handleVisibilityOfFilters() {
        setAllFiltersAreOpen(!allFiltersAreOpen);
        handleReset();
    }

    function handleReset() {
        setFullText("");
        setId("");
        setModel("")
        setBrand("");
        setIndicator("");
        setModelFamily("");
        setLaunchDate("");
        setModelYear("");
        setDevelopmentType("");
        setModelStatus("");
        setSegment("");
        setCarBodyType("");
        setCarBodySpecification("");
        setEngineType("");
        setCarProject("");
        setLimitation("");
        setUuid("");
        setSisterModelOne("");
        setSisterModelTwo("");
        setModelType("");
        setBaseCar("");
    }

    function backFromCarDataPage() {
        setIdOfCarClickedByUser(-1);
        setFullTextSearchPageIsOpen(true);
    }

    return (
        <>
            { fullTextSearchPageIsOpen ?
                <>
                    <div className="box">
                        <input type="text" placeholder="Full text" value={ fullText }
                            onChange={ event => setFullText(event.target.value) } />

                        <button onClick={ handleVisibilityOfFilters }>Show all filters</button>
                        <button onClick={ handleReset }>Reset all filters</button>
                        <button onClick={ handleClickOnShowResults }>Show results</button>
                        <button onClick={ props.onBack }>Back</button><br /><br />
                    </div>

                    { allFiltersAreOpen ?
                        <>
                            <div className="box">
                                <input type="text" placeholder="ID" value={ id }
                                    onChange={ event => setId(event.target.value) } />
                                <input type="text" placeholder="Model" value={ model }
                                    onChange={ event => setModel(event.target.value) } />
                                <input type="text" placeholder="Brand" value={ brand }
                                    onChange={ event => setBrand(event.target.value) } />
                                <input type="text" placeholder="Indicator" value={ indicator }
                                    onChange={ event => setIndicator(event.target.value) } />
                                <input type="text" placeholder="Model family" value={ modelFamily }
                                    onChange={ event => setModelFamily(event.target.value) } />
                            </div>
                            <div className="box">
                                <input type="text" placeholder="Launch date" value={ launchDate }
                                    onChange={ event => setLaunchDate(event.target.value) } />
                                <input type="text" placeholder="Model year" value={ modelYear }
                                    onChange={ event => setModelYear(event.target.value) } />
                                <input type="text" placeholder="Dev. Type" value={ developmentType }
                                    onChange={ event => setDevelopmentType(event.target.value) } />
                                <input type="text" placeholder="Model status" value={ modelStatus }
                                    onChange={ event => setModelStatus(event.target.value) } />
                                <input type="text" placeholder="Segment" value={ segment }
                                    onChange={ event => setSegment(event.target.value) } />
                            </div>
                            <div className="box">
                                <input type="text" placeholder="Car Body Type" value={ carBodyType }
                                    onChange={ event => setCarBodyType(event.target.value) } />
                                <input type="text" placeholder="Car Body Spec." value={ carBodySpecification }
                                    onChange={ event => setCarBodySpecification(event.target.value) } />
                                <input type="text" placeholder="Engine Type" value={ engineType }
                                    onChange={ event => setEngineType(event.target.value) } />
                                <input type="text" placeholder="Car Project" value={ carProject }
                                    onChange={ event => setCarProject(event.target.value) } />
                                <input type="text" placeholder="Limitation" value={ limitation }
                                    onChange={ event => setLimitation(event.target.value) } />
                            </div>
                            <div className="box">
                                <input type="text" placeholder="UUID" value={ uuid }
                                    onChange={ event => setUuid(event.target.value) } />
                                <input type="text" placeholder="Sister Model 1" value={ sisterModelOne }
                                    onChange={ event => setSisterModelOne(event.target.value)} />
                                <input type="text" placeholder="Sister Model 2" value={ sisterModelTwo }
                                    onChange={ event => setSisterModelTwo(event.target.value) } />
                                <input type="text" placeholder="Model Type" value={ modelType }
                                    onChange={ event => setModelType(event.target.value) } />
                                <input type="text" placeholder="Base Car" value={ baseCar }
                                    onChange={ event => setBaseCar(event.target.value) } />
                            </div>
                        </>
                        : null
                    }

                    <div>
                        { cars !== null ?
                            <div className="whitetable">
                                <DataGrid
                                    onRowClick={ handleClickOnRow }
                                    rows={ cars }
                                    columns={ tableColumns }
                                    initialState={ { pagination: { paginationModel: { page: 0, pageSize: 50 }, }, } }
                                    pageSizeOptions={ [50] } />
                            </div> : null
                        }
                    </div>
            </> : null
            }

            { idOfCarClickedByUser !== -1 ? <CarDataPage creds={ props.creds } carId={ idOfCarClickedByUser }
                onBack={ backFromCarDataPage } /> : null }
        </>
    )
}
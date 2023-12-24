import { useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Car, getCarInfoByFullTextSearch } from "./api";
import { Credentials } from "./Credentials";
import './Datagrid.css'

export type Props = { creds: Credentials; onBack: () => void };

export function CarInfoPage(props: Props) {
    const [cars, setCars] = useState<null | Car[]>(null)
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
    const [allFiltersAreOpen, setAllFiltersAreOpen] = useState(false);

    const tableColumns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 50 },
        { field: 'model', headerName: 'Modell', width: 50 },
        { field: 'brand', headerName: 'Marke', width: 50 },
        { field: 'indicator', headerName: 'Markenindikator', width: 50 },
        { field: 'modelFamily', headerName: 'Modellfamilie', width: 50 },
        { field: 'launchDate', headerName: 'Markteinführung', width: 50 },
        { field: 'modelYear', headerName: 'Modelljahr', width: 50 },
        { field: 'developmentType', headerName: 'Entwicklungstyp', width: 50 },
        { field: 'modelStatus', headerName: 'Modellstatus', width: 50 },
        { field: 'segment', headerName: 'Segment', width: 50 },
        { field: 'carBodyType', headerName: 'Karosserieart', width: 50 },
        { field: 'carBodySpecification', headerName: 'Karosseriespez.', width: 50 },
        { field: 'engineType', headerName: 'Antrieb', width: 50 },
        { field: 'carProject', headerName: 'Projekt', width: 50 },
        { field: 'limitation', headerName: 'Limit', width: 50 },
        { field: 'uuid', headerName: 'UUID', width: 50 },
        { field: 'sisterModelOne', headerName: 'Schwestermodell 1', width: 50 },
        { field: 'sisterModelTwo', headerName: 'Schwestermodell 2', width: 50 },
        { field: 'modelType', headerName: 'Modelltyp', width: 50 },
        { field: 'baseCar', headerName: 'Basisvehikel', width: 50 }
    ];

    function handleFilter() {
        getCarInfoByFullTextSearch(props.creds, fullText, id, model, brand, indicator, modelFamily, launchDate, modelYear,
            developmentType, modelStatus, segment, carBodyType, carBodySpecification, engineType, carProject, limitation, uuid,
            sisterModelOne, sisterModelTwo, modelType, baseCar)
            .then(body => setCars(body.data));
    }

    function handleOpenCloseFilters() {
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

    return (
        <>
            <div className="box">
                <input type="text" placeholder="Full text" value={fullText}
                    onChange={event => setFullText(event.target.value)} />

                <button onClick={handleOpenCloseFilters}>Alle Filter anzeigen</button>
                <button onClick={handleReset}>Alle Felder reseten</button>
                <button onClick={handleFilter}>Ergebnisse anzeigen</button>
                <button onClick={props.onBack}>Zurück</button><br /><br />
            </div>

            {allFiltersAreOpen ?
                <>
                    <div className="box">
                        <input type="text" placeholder="ID" value={id}
                            onChange={event => setId(event.target.value)} />
                        <input type="text" placeholder="Modell" value={model}
                            onChange={event => setModel(event.target.value)} />
                        <input type="text" placeholder="Marke" value={brand}
                            onChange={event => setBrand(event.target.value)} />
                        <input type="text" placeholder="Markenindikator" value={indicator}
                            onChange={event => setIndicator(event.target.value)} />
                        <input type="text" placeholder="Modellfamilie" value={modelFamily}
                            onChange={event => setModelFamily(event.target.value)} />
                    </div>
                    <div className="box">
                        <input type="text" placeholder="Markteinführung" value={launchDate}
                            onChange={event => setLaunchDate(event.target.value)} />
                        <input type="text" placeholder="Modelljahr" value={modelYear}
                            onChange={event => setModelYear(event.target.value)} />
                        <input type="text" placeholder="Entwicklungstyp" value={developmentType}
                            onChange={event => setDevelopmentType(event.target.value)} />
                        <input type="text" placeholder="Modellstatus" value={modelStatus}
                            onChange={event => setModelStatus(event.target.value)} />
                        <input type="text" placeholder="Segment" value={segment}
                            onChange={event => setSegment(event.target.value)} />
                    </div>
                    <div className="box">
                        <input type="text" placeholder="Karosserieart" value={carBodyType}
                            onChange={event => setCarBodyType(event.target.value)} />
                        <input type="text" placeholder="Karosserie-Spez." value={carBodySpecification}
                            onChange={event => setCarBodySpecification(event.target.value)} />
                        <input type="text" placeholder="Antrieb" value={engineType}
                            onChange={event => setEngineType(event.target.value)} />
                        <input type="text" placeholder="Project" value={carProject}
                            onChange={event => setCarProject(event.target.value)} />
                        <input type="text" placeholder="Limit" value={limitation}
                            onChange={event => setLimitation(event.target.value)} />
                    </div>
                    <div className="box">
                        <input type="text" placeholder="UUID" value={uuid}
                            onChange={event => setUuid(event.target.value)} />
                        <input type="text" placeholder="Schwestermodell 1" value={sisterModelOne}
                            onChange={event => setSisterModelOne(event.target.value)} />
                        <input type="text" placeholder="Schwestermodell 2" value={sisterModelTwo}
                            onChange={event => setSisterModelTwo(event.target.value)} />
                        <input type="text" placeholder="Modelltyp" value={modelType}
                            onChange={event => setModelType(event.target.value)} />
                        <input type="text" placeholder="Basisvehikel" value={baseCar}
                            onChange={event => setBaseCar(event.target.value)} />
                    </div>
                </>
                : null}

            <div>
                {cars !== null ?
                    <div className="whitetable">
                        <DataGrid
                            rows={ cars }
                            columns={ tableColumns }
                            initialState={{ pagination: { paginationModel: { page: 0, pageSize: 50 }, }, }}
                            pageSizeOptions={[50]} />
                    </div> : null
                }
            </div>
        </>
    )

}
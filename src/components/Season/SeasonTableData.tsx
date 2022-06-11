import React, {FC, useMemo, useState} from 'react';
import {IEpisodeType} from "../../types/episodes/episodes";
import {Image, Table} from "react-bootstrap";
import {NavLink} from "react-router-dom";
import hide from './../../files/icons/hide.png'
import './SeasonTableData.css'

interface IProps {
    data: IEpisodeType[],
    filterText: string
}

const thData = [["id", "id"], ["name", "Название"], ["air_date", "Дата выхода"], ["episode", "Эпизод"], ["characters", "Персонажи"]]
const SeasonTableData: FC<IProps> = ({data, filterText}) => {

    //-----------------------------------------------------------------------
    // текущий критерий сортировки по которому сортируются ячейки в таблице
    const [currentSortType, setCurrentSortType] = useState<string>("")
    const [equalSortType, setEqualSortType] = useState<boolean>(false)
    // массив из имен колонок данные которых должны быть скрытыми - если строка есть в массиве --> колонки не видны
    const [hiddenColumns, setHiddenColumns] = useState<string[]>([])
    //------------------------------------------------------------------------

    // фильтруются данные в таблицы относительно того что находиться в фильтрующем инпуте
    const filteredData: IEpisodeType[] = useMemo(() => {
        if (filterText.trim() === "") return data
        else {
            return data.filter(el => el.name.toLowerCase().includes(filterText.toLowerCase()))
        }
    }, [filterText, data]);
    // фукнция для того чтобы скрыть колонки в таблице
    const thHideHandler = (e: any) => {
        // не дает делать фильтрацию при клике на иконку
        e.stopPropagation()
        const current = e.target.closest('th').innerText.trim()
        if (hiddenColumns.includes(current)) {
            setHiddenColumns(prev => prev.filter(el => el !== current))
        } else {
            setHiddenColumns(prev => [...prev, current])
        }
    }
    // обновляем в состоянии текущее поле сортировки таблицы и меняем флаг для двусторонней сортировки
    const thSortHandler = (sortType: string) => {
        if (currentSortType !== sortType) {
            setEqualSortType(false)
        } else {
            setEqualSortType(prev => !prev)
        }
        setCurrentSortType(sortType)
    }
    // данные отсортированные по выбранному столбцу
    const filteredColumnsData = useMemo(() => {
        if (!currentSortType) return filteredData
        if (!equalSortType) {
            return filteredData.sort(function (a, b) {
                if (a[currentSortType] < b[currentSortType]) {
                    return -1;
                }
                if (a[currentSortType] > b[currentSortType]) {
                    return 1;
                }
                return 0;
            })
        } else {
            return filteredData.sort(function (a, b) {
                if (a[currentSortType] > b[currentSortType]) {
                    return -1;
                }
                if (a[currentSortType] < b[currentSortType]) {
                    return 1;
                }
                return 0;
            })
        }
    }, [filteredData, currentSortType, equalSortType]);

    return (
        <Table striped bordered hover responsive>
            <thead>
            <tr>
                {
                    thData.map(([forSort, thText]) => (
                        <th
                            key = {forSort}
                            onClick={(event) => thSortHandler(forSort)}
                            className='align-items-center gap-1 table-th-hov'>{thText}<Image
                            onClick={thHideHandler}
                            className="table-hover-image ms-3"
                            width={20} height={20}
                            src={hide}/></th>
                    ))
                }
            </tr>
            </thead>
            <tbody>
            {
                filteredColumnsData.map(episodeElement => (
                    <tr key={episodeElement.id}>
                        <td><NavLink to={`/episode-info/${episodeElement.id}`}
                                     className="text-decoration-none text-black w-100"
                                     style={{opacity: `${hiddenColumns.includes("id") ? 0 : 1}`}}>{episodeElement.id}</NavLink>
                        </td>
                        <td><span
                            style={{opacity: `${hiddenColumns.includes("Название") ? 0 : 1}`}}>{episodeElement.name}</span>
                        </td>
                        <td><span
                            style={{opacity: `${hiddenColumns.includes("Дата выхода") ? 0 : 1}`}}>{episodeElement.air_date}</span>
                        </td>
                        <td><span
                            style={{opacity: `${hiddenColumns.includes("Эпизод") ? 0 : 1}`}}>{episodeElement.episode.split("E")[1]}</span>
                        </td>
                        <td><span
                            style={{opacity: `${hiddenColumns.includes("Персонажи") ? 0 : 1}`}}>{episodeElement.characters.length}</span>
                        </td>
                    </tr>
                ))
            }
            {
                filteredData.length === 0 && (
                    <tr key={123222}>
                        <td>К</td>
                        <td>Сожалению</td>
                        <td>Ничего</td>
                        <td>Не</td>
                        <td>Найдено..</td>
                    </tr>
                )
            }
            </tbody>
        </Table>
    );

}

export default SeasonTableData;
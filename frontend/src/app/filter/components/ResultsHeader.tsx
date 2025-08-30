import { FiList, FiGrid, FiChevronDown, FiX } from 'react-icons/fi';
import { ViewType, ActiveFilterPill } from '@/app/filter/types/shop';

interface ResultsHeaderProps {
    view: ViewType;
    setView: (view: ViewType) => void;
    activePills: ActiveFilterPill[];
    removeFilter: (type: string, value: string | number) => void;
}

export const ResultsHeader: React.FC<ResultsHeaderProps> = ({ view, setView, activePills, removeFilter }) => (
    <div className="bg-gray-50 rounded-lg p-4">
        <h2 className="text-xl font-semibold text-gray-800">Résultat trouvé</h2>
        <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2 text-sm">
                {activePills.length > 0 ? (
                    <>
                        <span className="font-semibold text-gray-600">Filtres actifs:</span>
                        {activePills.map(({ type, value }) => (
                            <span key={`${type}-${value}`} className="flex items-center gap-1 bg-black text-white pl-3 pr-2 py-1 rounded-full">
                                {type === 'rating' ? `${value} Stars` : value}
                                <button onClick={() => removeFilter(type, value)}><FiX size={16}/></button>
                            </span>
                        ))}
                    </>
                ) : <span className="text-gray-500">Aucun filtre actif</span>}
            </div>
            <div className="flex items-center gap-4">
                <button className="flex items-center gap-2 text-sm text-gray-700"><span>Prix plus élevé</span><FiChevronDown /></button>
                <div className="flex items-center border rounded-lg overflow-hidden">
                    <button onClick={() => setView('list')} className={`p-2 transition-colors ${view === 'list' ? 'bg-pink-100 text-pink-600' : 'bg-white'}`}><FiList /></button>
                    <button onClick={() => setView('grid')} className={`p-2 transition-colors ${view === 'grid' ? 'bg-pink-100 text-pink-600' : 'bg-white'}`}><FiGrid /></button>
                </div>
            </div>
        </div>
        <p className="mt-4 text-sm text-gray-500">96 de 1 résultats trouvés</p>
    </div>
);
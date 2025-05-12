import { useState } from 'react';


function UpdatesPage() {
    const [updates] = useState([
        {
            date: "05-12-2025",
            changes: [
                "Added the Music app which displays some of my music stats from last.fm",
                "Spotify api used for missing track and artist images",
             ]
        },
        {
            date: "05-08-2025",
            changes: [
                "Added this feature to track updates",
                "Created Journal app(incomplete)"
            ]
        },
        {
            date: "05-02-2025",
            changes: [
                "Added Grid Game app"
            ]
        },
        {
            date: "04-27-2025",
            changes: [
                "Added Gallery and custom scrollbar css",
                "Changed Sudoku App image",
                "Changed Profile and game colors"
            ]
        },
        {
            date: "04-26-2025",
            changes: [
                "Added Sudoku app",
                "Added Calculator app"
            ]
        },
        {
            date: "04-25-2025",
            changes: [
                "Deployed portfolio to github pages"
            ]
        }
    ]);

    return (
        <div className="flex-1 flex flex-col p-4">
            <div className="text-white text-center text-2xl font-bold mb-6">What's New</div>
            <div className="space-y-6">
                {updates.map((update, i) => (
                    <div key={i} className="bg-white/5 rounded-lg p-4">
                        <div className="text-white/70 text-sm mb-2">{update.date}</div>
                        <ul className="space-y-2">
                            {update.changes.map((change, changeIndex) => (
                                <li key={changeIndex} className="text-white flex items-start gap-2">
                                    <span className="material-icons md-8 py-[8px]">fiber_manual_record</span>
                                    {change}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default UpdatesPage; 
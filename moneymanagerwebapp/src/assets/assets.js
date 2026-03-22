import logo from "./logoCopy.png";
import login_bg from "./login_bg.png";

export const assets = {
    logo,
    login_bg,
}

// Importing icons from lucide-react for the sidebar mapping [2]
import { 
    LayoutDashboard, 
    List, 
    Wallet, 
    ReceiptText, 
    SlidersHorizontal 
} from 'lucide-react';

// 2. Exporting Sidebar Navigation Data [2]
// This array of objects maps the label, route path, and lucide-react icon for the sidebar
export const SIDEBAR_DATA = [
    { id: 1, label: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
    { id: 2, label: 'Category', icon: List, path: '/category' },
    { id: 3, label: 'Income', icon: Wallet, path: '/income' },
    { id: 4, label: 'Expense', icon: ReceiptText, path: '/expense' },
    { id: 5, label: 'Filters', icon: SlidersHorizontal, path: '/filter' }
];
import Dashboard from './views/dashbord'
import AccountPayment from "./views/AllAccountPayments"
import YearlyCheck from "./views/YearlyChecking"
import Settings from './views/Settings'
import StockRecord from "./views/StockRecord"
import SalesRecord from "./views/SalesRecord"


import DashboardIcon from '@material-ui/icons/Dashboard';
import DataUsageIcon from '@material-ui/icons/DataUsage';
import MoneyIcon from '@material-ui/icons/Money';
import PaymentIcon from '@material-ui/icons/Payment';
import HistoryIcon from '@material-ui/icons/History';
import SettingsIcon from '@material-ui/icons/Settings';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const routes=[
    {
        path: "/dashboard",
        name: "Dashboard",
        icon: DashboardIcon,
        component: Dashboard,
        layout: "/admin"
    },
    {
        path: "/stockRecords",
        name: "StockRecords",
        icon: DataUsageIcon ,
        component: StockRecord,
        layout: "/admin"
    },
    {
        path: "/salesRecords",
        name: "SalesRecords",
        icon: MoneyIcon,
        component: SalesRecord,
        layout: "/admin"
    },
    {
        path: "/accountPayment",
        name: "Payments",
        icon: PaymentIcon,
        component: AccountPayment,
        layout: "/admin"
    },
    {
        path: "/yearlyChecking",
        name: "YearlyCheckings",
        icon: HistoryIcon,
        component: YearlyCheck,
        layout: "/admin"
    },
    {
        path: "/setting",
        name: "Setting",
        icon: SettingsIcon,
        component: Settings,
        layout: "/admin"
    },
    {
        path: "/logingout...",
        name: "logout",
        icon: ExitToAppIcon,
        component: <div></div>,
        layout: "/admin"
    },

]

export default routes;
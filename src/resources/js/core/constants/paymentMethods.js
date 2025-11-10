import bcaLogo from "@/assets/img/payment/bca.svg";
import mandiriLogo from "@/assets/img/payment/mandiri.svg";
import briLogo from "@/assets/img/payment/bri.svg";
import indomaretLogo from "@/assets/img/payment/indomaret.svg";
import shopeePayLogo from "@/assets/img/payment/shopeepay.svg";
import danaLogo from "@/assets/img/payment/dana.svg";

export const paymentMethods = [
    {
        id: "bca",
        label: "BCA Virtual Account",
        logo: bcaLogo,
    },
    {
        id: "mandiri",
        label: "Mandiri Virtual Account",
        logo: mandiriLogo,
    },
    {
        id: "briva",
        label: "BRI Virtual Account",
        logo: briLogo,
    },
    {
        id: "indomaret",
        label: "Indomaret",
        logo: indomaretLogo,
    },
    {
        id: "shopeepay",
        label: "ShopeePay",
        logo: shopeePayLogo,
    },
    {
        id: "dana",
        label: "Dana",
        logo: danaLogo,
    },
];

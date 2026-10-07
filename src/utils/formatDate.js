export default function formatDate (isoDate) {
        return isoDate?.split('-').reverse().join('-');
    }
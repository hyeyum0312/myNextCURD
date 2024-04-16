export default async function handler(req:any, res:any){
    const today = new Date();
    res.status(200).json(today);
}
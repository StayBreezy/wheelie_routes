module.exports = {
 getRoutePics: async (req, res) => {
     // req.params route_id
     const {id} = req.params;
     const db = req.app.get("db");
     const pics = await db.pictures.get_all_pictures_for_route([id]);
     console.log(pics)
    return res.send(pics);
 },
 uploadRoutePics: async (req, res) => {
     //req.params route_id
     const {route_id} = req.params;
     const {user_id, url, description} = req.body;
     const db = req.app.get("db");
     const pics = await db.pictures.insert_pictures([route_id, user_id, url, description])
     return res.send(pics);
     // req.body user_id picture_url description
     // figure out wether to upload 1 pic at a time or be able to upload multiple images which probably means iterating over an array to post photos
     //returns pic urls or just the one url

 },
 getMyPics: async (req, res) => {
    const {user_id} = req.params;
    const db = req.app.get('db');
    const imgs = await db.pictures.get_all_my_pictures([user_id]);
    return res.send(imgs);
 },
 deletePics: async (req, res) => {
     const {route_id, picture_id} = req.params;
     const db = req.app.get('db');
     const imgs = await db.pictures.delete_route_pictures([picture_id, route_id]);
     return res.send(imgs);

 }
}


import { useSession } from "@supabase/auth-helpers-react";
import { useState } from "react";
import supabase from "../lib";


export default function Creation({onPost}) {
 const session = useSession();
 const [content,setContent] = useState('')
 const [title,setTitle] = useState('')
 const [uploads , setUploads] = useState([])
 const [heading, setHeading] = useState('')
 const [isUploading , SetIsUploading] = useState(false)

 function createPost(){
  
  supabase.from('posts').insert({
      author:session.user.id,
      title,
      content,
      photos:uploads,
  }).then(response => {
      if(!response.error){
          setContent('');
          setUploads([]);
          alert("Success!");
          if(onPost){
            onPost();
          }
      }
  })
 }
//https://swqqmxaxhvztuvqqjbqg.supabase.co/storage/v1/object/public/photos/1676605603254Screenshot%202023-02-15%20at%2011.19.49%20AM.png

 async function addPhotos(e) { 

  const files = e.target.files;
  if(files.length > 0){
    SetIsUploading(true);
  for( const file of files ) {
    const newName =Date.now() + file.name;
    const result = await supabase.storage.from('photos')
    .upload(newName, file)
    if(result.data) {
        const url = process.env.NEXT_PUBLIC_SUPABASE_URL + '/storage/v1/object/public/photos/' + result.data.path
        setUploads(prevUploads => [...prevUploads,url]);
}
     else {
    console.log(result);
    }  
  }
  SetIsUploading(false);
 }
}
return (
  <div>
    <div className="flex place-content-center">
          <div className=" mx-11 px-7 mt-4 border-2 ring-2 w-1/2 ">
            <h1 className="text-4xl py-11 text-white flex place-content-center">
                Create Your Own Magazine Page !
            </h1>
            <label className="text-green-500">Title: </label>
            <input type="text" placeholder="Enter Title of the Magazine Page" onChange = {e => setTitle(e.target.value)} className="w-full"/>
            <p className="text-green-500 py-4">Content:
           <textarea  
             value={content} 
             onChange={e => setContent(e.target.value)}
             className="text-black border-4  w-full mt-4"  /></p>
             {isUploading && (
                <div>Photos are uploading please wait </div>
             )}
             {uploads.length > 0 && (
                <div className="flex-gap-4 ">
                    {uploads.map(upload => (
                        <div className="h-12"><img src={upload} alt='alternate' className="w-auto h-12 rounded-md"/></div>
                    ))}
                    </div>
             )}
             <p className="text-green-600 ">Upload Photos<input type="file" onChange={addPhotos} className="px-11 py-4"/></p>
           <button onClick={createPost} className="px-3 bg-blue-500 py-1 rounded-xl text-white">Create Post</button>
       </div>

       </div>
       <h1 className="text-green-500 text-2xl text-center mt-11">
    Read Community Guidelines Before Posting
   </h1>
<div className="flex place-content-center py-11">
      
   <p className="text-white">Instagram is a reflection of our diverse community of cultures, ages and beliefs. We've spent a lot of time thinking about the different points of view that create a safe and open environment for everyone.
We created the Community Guidelines so you can help us foster and protect this amazing community. By using Instagram, you agree to these guidelines and our Terms of Use. We're committed to these guidelines and we hope that you are too. Overstepping these boundaries may result in deleted content, disabled accounts or other restrictions.
In some cases, we allow content for public awareness which would otherwise go against our Community Guidelines – if it is newsworthy and in the public interest. We only do this after weighing the public interest value against the risk of harm and we look to international human rights standards to make these judgments.
Share only photos and videos that you've taken or have the right to share.<br />
As always, you own the content that you post on Instagram. Remember to post authentic content, and don't post anything that you've copied or collected from the Internet that you don't have the right to post. Learn more about intellectual property rights.
Post photos and videos that are appropriate for a diverse audience.<br />
We know that there are times when people might want to share nude images that are artistic or creative in nature, but for a variety of reasons, we don't allow nudity on Instagram. This includes photos, videos and some digitally-created content that show sexual intercourse, genitals and close-ups of fully-nude buttocks. It also includes some photos of female nipples, but photos in the context of breastfeeding, birth giving and after-birth moments, health-related situations (for example, post-mastectomy, breast cancer awareness or gender confirmation surgery) or an act of protest are allowed. Nudity in photos of paintings and sculptures is OK too.
People like to share photos or videos of their children. For safety reasons, there are times when we may remove images that show nude or partially nude children. Even when this content is shared with good intentions, it could be used by others in unanticipated ways. You can learn more on our Tips for parents page.
Foster meaningful and genuine interactions.<br />
Help us stay spam-free by not artificially collecting likes, followers or shares, posting repetitive comments or content, or repeatedly contacting people for commercial purposes without their consent. Don't offer money or giveaways of money in exchange for likes, followers, comments or other engagement. Don't post content that engages in, promotes, encourages, facilitates or admits to the offering, solicitation or trade of fake and misleading user reviews or ratings.
You don't have to use your real name on Instagram, but we do require Instagram users to provide us with accurate and up-to-date information. Don't impersonate others and don't create accounts for the purpose of violating our guidelines or misleading others.
Follow the law.<br />
Instagram is not a place to support or praise terrorism, organised crime or hate groups. Offering sexual services, buying or selling firearms, alcohol and tobacco products between private individuals, and buying or selling non-medical or pharmaceutical drugs are also not allowed. We also remove content that attempts to trade, co-ordinate the trade of, donate, gift or ask for non-medical drugs, as well as content that either admits to personal use (unless in the recovery context) or coordinates or promotes the use of non-medical drugs. Instagram also prohibits the sale of live animals between private individuals, although brick-and-mortar shops may offer these sales. No one may coordinate poaching or selling of endangered species or their parts.
Remember to always follow the law when offering to sell or buy other regulated goods. Accounts promoting online gambling, online real money games of skill or online lotteries must get our prior written permission before using any of our products.
We have zero tolerance when it comes to sharing sexual content involving minors or threatening to post intimate images of others.
Respect other members of the Instagram community.<br />
We want to foster a positive, diverse community. We remove content that contains credible threats or hate speech, content that targets private individuals to degrade or shame them, personal information meant to blackmail or harass someone, and repeated unwanted messages. We do generally allow stronger conversation around people who are featured in the news or have a large public audience due to their profession or chosen activities.
It's never OK to encourage violence or attack anyone based on their race, ethnicity, national origin, sex, gender, gender identity, sexual orientation, religious affiliation, disabilities or diseases. When hate speech is being shared to challenge it or to raise awareness, we may allow it. In those instances, we ask that you express your intent clearly.
Serious threats of harm to public and personal safety aren't allowed. This includes specific threats of physical harm as well as threats of theft, vandalism and other financial harm. We carefully review reports of threats and consider many things when determining whether a threat is credible.
Maintain our supportive environment by not glorifying self-injury.<br />
The Instagram community cares for each other, and is often a place where people facing difficult issues such as eating disorders, cutting or other kinds of self-injury come together to create awareness or find support. We try to do our part by providing education in the app and adding information in the Help Centre so people can get the help they need.
Encouraging or urging people to embrace self-injury is counter to this environment of support, and we'll remove it or disable accounts if it's reported to us. We may also remove content identifying victims or survivors of self-injury if the content targets them for attack or humour.
Be thoughtful when posting newsworthy events.<br />
We understand that many people use Instagram to share important and newsworthy events. Some of these issues can involve graphic images. Because so many different people and age groups use Instagram, we may remove videos of intense, graphic violence to make sure that Instagram stays appropriate for everyone.
We understand that people often share this kind of content to condemn, raise awareness or educate. If you do share content for these reasons, we encourage you to caption your photo with a warning about graphic violence. Sharing graphic images for sadistic pleasure or to glorify violence is never allowed.
Help us keep the community strong:<br />
Each of us is an important part of the Instagram community. If you see something that you think may violate our guidelines, please help us by using our built-in reporting option. We have a global team that reviews these reports and works as quickly as possible to remove content that doesn't meet our guidelines. Even if you or someone you know doesn't have an Instagram account, you can still file a report. When you complete the report, try to provide as much information as possible, such as links, usernames and descriptions of the content, so we can find and review it quickly. We may remove entire posts if either the imagery or associated captions violate our guidelines.
You may find content that you don't like, but doesn't violate the Community Guidelines. If that happens, you can unfollow or block the person who posted it. If there's something that you don't like in a comment on one of your posts, you can delete that comment.
Many disputes and misunderstandings can be resolved directly between members of the community. If one of your photos or videos was posted by someone else, you could try commenting on the post and asking the person to take it down. If that doesn't work, you can file a copyright report. If you believe that someone is violating your trademark, you can file a trademark report. Don't target the person who posted it by posting screenshots and drawing attention to the situation because that may be classified as harassment.
We may work with law enforcement, including when we believe that there's risk of physical harm or threat to public safety.<br />
For more information, see our Help Centre and Terms of Use.<br />
Thank you for helping us create one of the best communities in the world,<br />
The Instagram Team</p>

</div>
</div>
);
}
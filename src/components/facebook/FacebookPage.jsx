import axios from "axios";
import { useState } from "react";

// "https://graph.facebook.com/v12.0/me?fields=id%2Cname%2Caccounts&access_token=EAAMfUd4UmD0BALk14RkP90r3Elz7LuXmqegQmP5YoYffRqNoSGMZC3KEb3ThQM3d3EG8iGFX0zIqAThrv6Bw2PfKZAMwCvGT98PkZA5mqb7C6NZBlQFPJS3fiNpQFrAj20r3GZBgJSZBR4JNwIFnJZB2l680ZCCHij19OCQ1ZBbjAWXew1FTsVxvMyQcQo4LEx78o9xeKMdU8qrFo5rpfaDsQhHPe03U7REIF5z23q2uX7KZBzW3vac1lRzqlnNUYk260ZD"

const PAGE_ID = "107488055333390"; // SeeMee
const GRAPH_API = "https://graph.facebook.com/v12.0";
const ACCESS_TOKEN_1 =
  "EAABsbCS1iHgBAJ2zFGI8sAklVtq0tJKZAZAm9Y69wztaGHQMjnjyUTQa2ZAIXUQhtVvXeWAMw20yzkG95Ko5a1ZC9Et6KxxcAdwekbJy0sQgUfLH3vMc1JEF98GQtjqTpUWAPIiQ9IquUmV970tuqU9XRqO8xe1z6Eq5VYnZAjBG7aov7U1PE2V7OJWdlQJUZD";

const ACCESS_TOKEN =
  "EAAMfUd4UmD0BAAwfjnUdzAMmuxBZAFSAPoGGc1aFUhlvuivzqV82oco70JBqZBZCZARyuOliblYjRzqohILRu7ZAZBkpEvZBCmnPJEkqpR8QtGr9hxIqy29ZBb9uayOaZBcm9hJsZAYyIzmxCgnTSBbTsboSHIweztx1pfzrtJ8oxBmyF5Ind8kU4ApJ7wLjyXSqzdSq4kWa72f7vRCwiXwZA51gCh2LXMOE3QZD";

const DebugAction = (props) => {
  const { value, onChange, label, ...others } = props;
  return (
    <div>
      <pre>{JSON.stringify(value, null, 2)}</pre>
      <button
        onClick={(e) => (onChange ? onChange(e.target.value) : undefined)}
        {...others}
      >
        {label}
      </button>
    </div>
  );
};

const FacebookPage = () => {
  const [pageId, setPageId] = useState(PAGE_ID);
  const [accoutInfo, setAccoutInfo] = useState();
  const [accountPage, setAccountPage] = useState();

  //   "access_token": "EAAMfUd4UmD0BAFvvQ4fznHy6KayZCcSlniXgY8jWOxwc1Rtb2MTZCwvZBTlgXLFCFknQvQ7Bi5KEh96xt1PJSLXXMDnfwZAGkTn4TtbQkR5MpHh2ZA04yVFw85i0yk17GFY5ZBBfbWXJIbCNpDwIocVc4Nu7WG3cnfQIqVEgLwXPs3ctQfYRUJHSMK8WcpxUxPipZAAsVOhFZClhJyGmzqwF1JfUP0sOtAcZD",
  //       "category": "Personal blog",
  //       "category_list": [
  //         {
  //           "id": "2700",
  //           "name": "Personal blog"
  //         },
  //         {
  //           "id": "2208",
  //           "name": "Camera/photo"
  //         }
  //       ],
  //       "name": "Oun Top",
  //       "id": "105063282254094",
  //       "tasks"

  const handleAccountInfoClick = (val) => {
    // fields=id,name,accounts&
    axios
      .get(`${GRAPH_API}/me/accounts?access_token=${ACCESS_TOKEN}`)
      .then((res) => setAccoutInfo(res.data));
  };

  const handleAccountPageClick = (val) => {
    axios
      .get(
        `${GRAPH_API}/${pageId}/feed?fields=fields=id,is_published,message,created_time,story&access_token=${ACCESS_TOKEN}`
      )
      .then((res) => setAccountPage(res.data));
  };

  return (
    <>
      <h1>FacebookPage</h1>
      <pre>{JSON.stringify({ pageId: PAGE_ID }, null, 2)}</pre>

      <DebugAction
        label="Account Info"
        value={accoutInfo}
        onChange={handleAccountInfoClick}
      />
      <DebugAction
        label="Account Page"
        value={accountPage}
        onChange={handleAccountPageClick}
      />
    </>
  );
};

export default FacebookPage;

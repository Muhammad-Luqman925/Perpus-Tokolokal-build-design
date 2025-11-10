import "@/assets/styles/pages/CommunityDetail.css";
import { Navbar } from "@/components/navigation/Navbar";
import { ButtonProperty1Default } from "@/components/ui/ButtonProperty1Default";
import { useNavigate, useParams } from "react-router-dom";

const IconCommunityBadge = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 2L14.4721 8.02786L21 8.76393L16 13.2361L17.4721 20L12 16.5L6.52786 20L8 13.2361L3 8.76393L9.52786 8.02786L12 2Z"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const IconUsers = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="10" cy="8" r="4" stroke="currentColor" strokeWidth="1.6" />
    <path
      d="M4 20C4.5 15.5 7.5 13 10 13C12.5 13 15.5 15.5 16 20"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
    />
    <path
      d="M15.5 4.5C17.433 4.5 19 6.067 19 8C19 9.02428 18.6166 9.95866 18 10.6776"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
    />
    <path
      d="M21 19C20.6667 16.6667 19.5 14.5 17.5 13.5"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
    />
  </svg>
);

const IconBell = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M6 18H18M12 3C8.68629 3 6 5.68629 6 9V12.5C6 13.3284 5.55228 14.1054 4.82843 14.5355L4.5 14.7333C4.18435 14.922 4 15.2611 4 15.625V16C4 16.5523 4.44772 17 5 17H19C19.5523 17 20 16.5523 20 16V15.625C20 15.2611 19.8157 14.922 19.5 14.7333L19.1716 14.5355C18.4477 14.1054 18 13.3284 18 12.5V9C18 5.68629 15.3137 3 12 3Z"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
    />
    <path
      d="M10 20C10.5523 21.1951 11.4477 22 12.5 22C13.5523 22 14.4477 21.1951 15 20"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
    />
  </svg>
);

const IconCamera = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="5" width="18" height="14" rx="3" ry="3" stroke="currentColor" strokeWidth="1.6" />
    <path
      d="M15.5 10.5L12 14L10.5 12.5L7.5 15.5"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="9" cy="9" r="1" fill="currentColor" />
  </svg>
);


const IconComment = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M6 18L4 21V6C4 4.34315 5.34315 3 7 3H17C18.6569 3 20 4.34315 20 6V14C20 15.6569 18.6569 17 17 17H6Z"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const IconHeart = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 20C12 20 4 14.5 4 8.99999C4 6.23857 6.23858 3.99999 9 3.99999C10.6569 3.99999 12.1569 4.84284 13 6.09999C13.8431 4.84284 15.3431 3.99999 17 3.99999C19.7614 3.99999 22 6.23857 22 8.99999C22 14.5 14 20 14 20L12 21.5"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const MEDIA = {
  profile: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80",
  postAuthorOne: "https://images.unsplash.com/photo-1542834369-f10ebf06d3cb?auto=format&fit=crop&w=120&q=80",
  postAuthorTwo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80",
  postAuthorThree: "https://images.unsplash.com/photo-1544005312-94ddf0286df2?auto=format&fit=crop&w=120&q=80",
  postAuthorFour: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=120&q=80",
  attachmentOne: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=400&q=80",
  attachmentTwo: "https://images.unsplash.com/photo-1527549993586-dff825b37782?auto=format&fit=crop&w=400&q=80",
  attachmentThree: "https://images.unsplash.com/photo-1515900557244-92c02c517221?auto=format&fit=crop&w=400&q=80",
  attachmentFour: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=400&q=80",
};

const POSTS = [
  {
    id: "reii-12",
    author: "Reii_12.",
    handle: "@Reiinyourheart",
    time: "11h",
    avatar: MEDIA.postAuthorOne,
    content:
      "Ini udah beli yang ketiga kalinya dan bener bener sebagus itu buat kulitku yang oily, tapi inget harus reaply ya guys jangan sampe lupa.",
    attachments: [MEDIA.attachmentOne, MEDIA.attachmentTwo],
    comments: 15,
    likes: 122,
  },
  {
    id: "rana-11",
    author: "rana.",
    handle: "@rainyzx33",
    time: "11h",
    avatar: MEDIA.postAuthorTwo,
    content:
      "Awalnya skeptis karena kulitku sensitif banget. Tapi ternyata ingredients-nya gentle dan nggak bikin breakout. Senang banget nemu produk yang nggak harsh tapi tetap efektif.",
    attachments: [],
    comments: 3,
    likes: 87,
  },
  {
    id: "nabila-92",
    author: "nabila92",
    handle: "@glowwithnabs",
    time: "9h",
    avatar: MEDIA.postAuthorThree,
    content:
      "Lagi nyobain toner baru yang bikin kulit adem seketika. Klaimnya menyeimbangkan pH dan ternyata memang bikin kulit lebih siap nerima skincare berikutnya.",
    attachments: [MEDIA.attachmentThree],
    comments: 9,
    likes: 64,
  },
  {
    id: "dini-08",
    author: "dini08",
    handle: "@diniskincare",
    time: "7h",
    avatar: MEDIA.postAuthorFour,
    content:
      "Tips: jangan lupa double cleansing kalau lama pakai sunscreen. Sejak rajin double cleansing, pori-pori lebih bersih dan jarang clogged!",
    attachments: [],
    comments: 12,
    likes: 101,
  },
];

export const CommunityDetail = ({ className = "", ...props }) => {
  const navigate = useNavigate();
  const { slug = "skincares" } = useParams();
  const rootClassName = ["page-each-community", className].filter(Boolean).join(" ");

  return (
    <div className={rootClassName} {...props}>
      <div className="frame-427318265">
        <Navbar className="navigation-bar-instance" />

        <div className="group-427318264">
          <div className="rectangle-136" />

          <div className="group-427318263">
            <div className="menu">
              <div className="title">
                <IconCommunityBadge className="vector" aria-hidden="true" />
                <div className="heading-12">Skincares</div>
              </div>

              <div className="menu2">
                <div className="about">
                  <IconUsers className="menu-icon" aria-hidden="true" />
                  <div className="heading-13">1,311 members</div>
                </div>

                <button
                  type="button"
                  className="notifications"
                  onClick={() => navigate(`/community/${slug}/notifications`)}
                >
                  <IconBell className="menu-icon" aria-hidden="true" />
                  <div className="heading-13">Notifications</div>
                </button>

              </div>

              <div className="bottom-section">
                <div className="profile">
                  <img className="fp" src={MEDIA.profile} alt="Marukoo avatar" />
                  <div className="frame-427318232">
                    <div className="name">Marukoo</div>
                    <div className="username">@Marukokoko_2899</div>
                  </div>
                </div>

                <div className="text-field">
                  <div className="heading-14">Type Something...</div>
                </div>

                <div className="frame-123123123">
                  <button type="button" className="composer-pill composer-pill--icon" aria-label="Insert picture">
                    <IconCamera className="composer-pill__icon" aria-hidden="true" />
                  </button>
                  <button type="button" className="composer-pill composer-pill--gif" aria-label="Insert GIF">
                    GIF
                  </button>
                  <ButtonProperty1Default text="Post" className="post-button-instance" />
                </div>
              </div>
            </div>
                        <div className="contents">
              <div className="frame-427318283">
                <div className="rectangle-138" />
              </div>

              <div className="konten">
                  <div className="comments">
                    {POSTS.map((post) => (
                    <button
                      key={post.id}
                      type="button"
                      className={`post-card-trigger ${post.attachments.length ? "property-1-with-pict" : "property-1-without-pict"}`}
                      onClick={() => navigate(`/community/${slug}/post/${post.id}`)}
                    >
                      <div className="avatar">
                        <img className="image" src={post.avatar} alt={`${post.author} profile`} />
                        <div className="content">
                          <div className="full-name">{post.author}</div>
                          <div className="time">
                            <div className="_11-jan-2022">{post.handle}</div>
                            <div className="div">&bull;</div>
                            <div className="text">{post.time}</div>
                          </div>
                        </div>
                      </div>

                        <div className="frame-427318322">
                          <div className="text2">{post.content}</div>
                          {post.attachments.length ? (
                          <div className="frame-427318285">
                            {post.attachments.map((src, index) => (
                              <img
                                key={index}
                                className={`image-${index}`}
                                src={src}
                                alt={`Attachment ${index + 1}`}
                              />
                            ))}
                          </div>
                          ) : null}
                        </div>

                        <div className="reaction">
                          <div className="frame-427318289">
                            <IconComment className="reaction-icon" aria-hidden="true" />
                            <div className="heading-1">{post.comments}</div>
                          </div>
                          <div className="frame-427318288">
                            <IconHeart className="reaction-icon" aria-hidden="true" />
                            <div className="heading-1">{post.likes}</div>
                          </div>
                        </div>
                      </button>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityDetail;





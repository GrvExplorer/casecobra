import { Suspense } from 'react'
import styles from './singlePost.module.css'
import Image from 'next/image'
async function page({ params }) {

  const { slug } = params;
  console.log(slug);


  return (
    <> 
    <div className={styles.container}>
    {post.img && (
      <div className={styles.imgContainer}>
        <Image src={post.img} alt="" fill className={styles.img} />
      </div>
    )}
    <div className={styles.textContainer}>
      <h1 className={styles.title}>{post.title}</h1>
      <div className={styles.detail}>
        {post && (
          <Suspense fallback={<div>Loading...</div>}>
            <PostUser userId={post.userId} />
          </Suspense>
        )}
        <div className={styles.detailText}>
          <span className={styles.detailTitle}>Published</span>
          <span className={styles.detailValue}>
            {post.createdAt.toString().slice(4, 16)}
          </span>
        </div>
      </div>
      <div className={styles.content}>{post.desc}</div>
    </div>
  </div>
    </>
  )
}

export default page
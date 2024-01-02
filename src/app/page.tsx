'use client';

import { Button, Textarea } from '@mantine/core';
import styles from './page.module.scss';
import React, { useState } from 'react';
import { format } from 'date-fns';

type Post = {
  id: number;
  postedBy: string;
  postedAt: string;
  content: string;
};

export default function HomePage() {
  const [postContent, setPostContent] = useState<string>('');
  const [posts, setPosts] = useState<Post[]>([
    { id: 1, postedBy: '田中太郎', postedAt: '2024/01/01 16:00:00', content: '無事です' },
    { id: 2, postedBy: '田中次郎', postedAt: '2024/01/01 16:00:01', content: '無事です' },
    { id: 3, postedBy: '田中三郎', postedAt: '2024/01/01 16:00:02', content: '無事です' },
  ]);
  const handlePostContentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPostContent(event.target.value);
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    console.log(e);
    e.preventDefault();
    setPosts([
      ...posts,
      {
        id: posts[posts.length - 1].id + 1,
        postedBy: '田中四郎',
        postedAt: format(new Date(), 'yyyy/MM/dd hh:mm:ss'),
        content: postContent,
      },
    ]);
  };
  return (
    <main>
      <form className={styles.post_form} onSubmit={handleSubmit}>
        <Textarea
          className={styles.text_area}
          onChange={handlePostContentChange}
          placeholder="投稿内容を入力"
        />
        <Button type="submit" className={styles.post_button} variant="outline">
          投稿
        </Button>
      </form>
      <div className={styles.content_list__wrapper}>
        {posts.map((post) => {
          return (
            <div key={post.id}>
              <span className={styles.content_list}>{post.id}</span>
              <span className={styles.content_list}>{post.postedBy}</span>
              <span className={styles.content_list}>{post.postedAt}</span>
              <span className={styles.content_list}>{post.content}</span>
            </div>
          );
        })}
      </div>
    </main>
  );
}

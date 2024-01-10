'use client';

import { Button, TextInput, Textarea } from '@mantine/core';
import React, { useState } from 'react';
import styles from './page.module.scss';

type Post = {
  id: number;
  postedBy: string;
  postedAt: string;
  content: string;
};

const getFormattedDate = (date: Date) =>
  new Intl.DateTimeFormat('ja-JP', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false, // 24時間表記を使用する場合
  }).format(date);

export default function HomePage() {
  const [postContent, setPostContent] = useState<string>('');
  const [posts, setPosts] = useState<Post[]>([
    { id: 1, postedBy: '田中太郎', postedAt: '2024/01/01 16:00:00', content: '無事です' },
    { id: 2, postedBy: '田中次郎', postedAt: '2024/01/01 16:00:01', content: '無事です' },
    { id: 3, postedBy: '田中三郎', postedAt: '2024/01/01 16:00:02', content: '無事です' },
  ]);
  const [postName,setPostName] = useState<string>('');
  
  const handlePostContentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPostContent(event.target.value);
  };

  const handlePostNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPostName(event.target.value);
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPosts([
      ...posts,
      {
        id: posts[posts.length - 1].id + 1,
        postedBy: postName,
        postedAt: getFormattedDate(new Date()),
        content: postContent,
      },
    ]);
    setPostName('');
    setPostContent('');
  };
  return (
    <main>
      <form className={styles.post_form} onSubmit={handleSubmit}>
        <TextInput
          className={styles.text_name_area}
          value={postName}
          onChange={handlePostNameChange}
          placeholder="名前を入力"
        />
        <Textarea
          className={styles.text_content_area}
          value={postContent}
          onChange={handlePostContentChange}
          placeholder="投稿内容を入力"
        />
      
        <Button type="submit" className={styles.post_button} variant="outline" disabled={!postContent}>
          投稿
        </Button>
      </form>
      <div className={styles.content_list__wrapper}>
        {posts.map((post) => (
          <div key={post.id} className={styles.content}>
            <span className={styles.content_list}>{post.id}</span>
            <span className={styles.content_list}>{post.postedBy}</span>
            <span className={styles.content_list}>{post.postedAt}</span>
            <span className={styles.content_list}>{post.content}</span>
          </div>
        ))}
      </div>
    </main>
  );
}

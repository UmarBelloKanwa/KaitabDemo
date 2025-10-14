import React, { useState, useMemo, useEffect } from "react";
import { getUserTopics } from "@/lib/api/topics";
import type { Category, Topic, TopicMap } from "@/types/auth";
import { useSignup } from "@/context/SignupContext";


export default function useUserTopics() {
  const [topicCategories, setTopicCategories] = useState<TopicMap>({});
  const [loadingTopic, setLoadingTopic] = useState(true);
  const [selectedTopics, setSelectedTopics] = useState<Topic[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({ general: "" });
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);

  const { data, updateData, setStep } = useSignup();

  useEffect(() => {
    getUserTopics()
      .then((res: any) => {
        setTopicCategories(res.data);
        setExpandedCategories(Object.keys(res.data));
      })
      .catch((err: any) => {
        setErrors(err);
      })
      .finally(() => setLoadingTopic(false));
  }, []);

  const allTopics = useMemo(() => {
    return Object.values(topicCategories).flat();
  }, [topicCategories]);

  const filteredCategories = useMemo(() => {
    const searchLower = searchTerm.toLowerCase();
    return Object.entries(topicCategories).reduce((acc, [category, topics]) => {
      const matches = topics.filter((t) =>
        t.name.toLowerCase().includes(searchLower)
      );
      if (matches.length > 0) {
        acc[category] = matches;
      }
      return acc;
    }, {} as TopicMap);
  }, [searchTerm, topicCategories]);

  const handleToggleTopic = (topic: Topic) => {
    const isSelected = selectedTopics.some((t) => t.id === topic.id);
    if (isSelected) {
      setSelectedTopics((prev) => prev.filter((t) => t.id !== topic.id));
    } else {
      setSelectedTopics((prev) => [...prev, topic]);
    }
    
    updateData({
      interests: [...data.interests, { id: topic.id, category_id: topic.category_id }],
    });
  };

  const submitTopics = () => {
    setStep("personalInfo")
  };

  return {
    loadingTopic,
    selectedTopics,
    searchTerm,
    filteredCategories,
    handleToggleTopic,
    errors,
    submitTopics,
    isSubmitting,
  };
}

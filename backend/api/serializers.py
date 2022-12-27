from rest_framework import serializers
from .models import Feedback, Question, CustomUser, FeedbackResponse

class QuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = "__all__"

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

    def is_valid(self, *, raise_exception=False):
        data = self.initial_data
        
        # Validate the feedback field
        try:
            if data['feedback'] == '':
                raise serializers.ValidationError('Feedback field cannot be empty!')
        except KeyError:
            raise serializers.ValidationError('You must specify a feedback item!')

        # Validating MultipleChoice questions
        try:
            if data['question_type'] == 'MultipleChoice':
                if data['choice_1'] == '' or data['choice_2'] == '' or data['choice_3'] == '' or data['choice_4'] == '':
                    raise serializers.ValidationError('Multiple choice questions must have 4 choices')
        except KeyError:
            pass

        return super().is_valid(raise_exception=raise_exception)

    def save(self, **kwargs):
        data = self.validated_data
        return super().save(**kwargs)


class FeedbackSerializer(serializers.ModelSerializer):
    class Meta:
        model = Feedback
        fields = "__all__"


class FeedbackResponseSerializer(serializers.ModelSerializer):
    class Meta:
        model = FeedbackResponse
        fields = "__all__"


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ("id", "username", "email", "is_business", "credit")
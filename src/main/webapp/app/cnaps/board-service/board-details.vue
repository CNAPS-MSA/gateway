<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <div v-if="board">
                <h2 class="jh-entity-heading"><span v-text="$t('gatewayApp.boardBoard.detail.title')">Board Details</span></h2>
                <dl class="row jh-entity-details">
                    <dt>
                        <span v-text="$t('gatewayApp.boardBoard.title')">Title</span>
                    </dt>
                    <dd>
                        <span>{{board.title}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('gatewayApp.boardBoard.createdDate')">Created Date</span>
                    </dt>
                    <dd>
                        <span>{{board.createdDate}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('gatewayApp.boardBoard.writerName')">WriterName</span>
                    </dt>
                    <dd>
                        <span>{{board.writerName}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('gatewayApp.boardBoard.hit')">Hit</span>
                    </dt>
                    <dd>
                        <span>{{board.hit}} </span>
                    </dd>
                    <dt>
                        <span v-text="$t('gatewayApp.boardBoard.category')">Category</span>
                    </dt>
                    <dd>
                        <span>{{board.category}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('gatewayApp.boardBoard.content')">Content</span>
                    </dt>
                    <dd style="white-space: pre;">
                        <span>{{board.content}}</span>
                    </dd>
                    <dt v-if="this.userId === board.writerId">
                        <span>수정 및 삭제</span>
                    </dt>
                    <dd>
                        <router-link v-if="this.userId===board.writerId" :to="{name: 'BoardEdit', params: {boardId: board.id}}" tag="button"  class="btn btn-primary">
                            <font-awesome-icon icon="plus"></font-awesome-icon>
                            <span>게시글 수정</span>
                        </router-link>
                        <b-button v-if="this.userId === board.writerId" v-on:click="prepareRemove(board)"
                                  variant="danger"
                                  class="btn btn-danger"
                                  v-b-modal.removeEntity>
                            <font-awesome-icon icon="times"></font-awesome-icon>
                            <span class="d-none d-md-inline" v-text="$t('entity.action.delete')">Delete</span>
                        </b-button>
<!--                        <button v-if="this.userId === board.writerId" type="button" class="btn btn-primary" @click="deleteBoard(board.id)">-->
<!--                            <span>게시글 삭제</span>-->
<!--                        </button>-->
                    </dd>
                </dl>

            </div>
<!--            comment form -->
            <form name="editForm" role="form" novalidate v-on:submit.prevent="save()" >
                <div>
                    <div class="form-group">
                        <label class="form-control-label" for="comment-content">내용</label>
                        <input type="text" class="form-control" name="content" id="comment-content" placeholder="내을 입력하세요."
                               :class="{'valid': !$v.comment.content.$invalid, 'invalid': $v.comment.content.$invalid }"
                               v-model="comment.content" required/>
                        <div v-if="$v.comment.content.$invalid">
                            <small class="form-text text-danger" v-if="!$v.comment.content.required">
                                내용은 필수 작성 항목입니다.
                            </small>
                        </div>
                    </div>
                </div>
                <div>
                    <button type="submit" id="save-entity" :disabled="$v.$invalid || isSaving" class="btn btn-primary">
                        <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span>등록</span>
                    </button>
                </div>
            </form>
<!--            comment list-->
            <div v-if="commentList && commentList.length >0" class="card border-primary mb-2" v-for="comment in commentList">
                <div class="card-header">{{ comment.writerName}}}</div>
                    <div class="card-body">
                        {{ comment.content }}
                    </div>
            </div>
            <div v-show="commentList&& commentList.length > 0">
                <div class="row justify-content-center">
                    <jhi-item-count :page="page" :total="queryCount" :itemsPerPage="itemsPerPage"></jhi-item-count>
                </div>
                <div class="row justify-content-center">
                    <b-pagination size="md" :total-rows="totalItems" v-model="page" :per-page="itemsPerPage" :change="loadPage(page)"></b-pagination>
                </div>
            </div>
            </div>

        </div>
        <b-modal ref="removeEntity" id="removeEntity" >
            <span slot="modal-title"><span id="gatewayApp.boardBoard.delete.question" v-text="$t('entity.delete.title')">Confirm delete operation</span></span>
            <div class="modal-body">
                <p id="jhi-delete-book-heading" v-text="$t('gatewayApp.boardBoard.delete.question')">Are you sure you want to delete this Board?</p>
            </div>
            <div slot="modal-footer">
                <button type="button" class="btn btn-secondary" v-text="$t('entity.action.cancel')" v-on:click="closeDialog()">Cancel</button>
                <button type="button" class="btn btn-primary" id="jhi-confirm-delete-book" v-text="$t('entity.action.delete')" v-on:click="deleteBoard(board.id)">Delete</button>
            </div>
        </b-modal>

    </div>
</template>

<script lang="ts" src="./board-details.component.ts">
</script>
